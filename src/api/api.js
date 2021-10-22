const http = require('http');

function handle(request) {

    if(request.message.method == 'GET'){

        let response = new http.ServerResponse();
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html');
        response.end('<h1>Hello, World!</h1>');

        return response;
    }
    else {
        let response = new http.ServerResponse();
        response.statusCode = 401;
        response.setHeader('Content-Type', 'text/html');
        response.end('<h1>Method not supported</h1>');

        return response;
    }

    
}