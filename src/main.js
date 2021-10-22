const http = require('http');
const api = require('./api/api');

const port = 8097;

const server = http.createServer((req, res) => {

  let handle = api.handle(req);

  switch(handle.status){
    case 200:
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(handle.result);
    break;
    case 400: 
      res.statusCode = 400;
      res.setHeader('Content-Type', 'text/html');
      res.end('<h1>The content of the request\'s body is wrong</h1>');
    break;
    case 404:
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end('<h1>This service only accepts requests to calcCDBUnitPrice</h1>');
    break
    case 405:
      res.statusCode = 405;
      res.setHeader('Content-Type', 'text/html');
      res.end('<h1>This service only accepts GET requests</h1>');
    break
    case 406:
      res.statusCode = 406;
      res.setHeader('Content-Type', 'text/html');
      res.end('<h1>This service only accepts dates between 2016-11-14 and 2016-12-23</h1>');
    break

  }

})

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
})