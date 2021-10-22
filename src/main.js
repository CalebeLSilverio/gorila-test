const http = require('http');
const api = require('./api/api');

const port = 8097;

const server = http.createServer((req, res) => {

  res = api.handle(req);

})

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
})