const http = require('http');
const calculator = require('./svc/CBDcalculator');

function parseJSON(str){

    let body;
    try{
        body = JSON.parse(str);
        return body;
    }
    catch(e){
        return undefined;
    }
}

function isBodyValid(body){

    if(body.investmentDate == undefined || body.cdbRate == undefined || body.currentDate == undefined){
        return false;
    }

    return true;
}

function isRequestValid(url, method, bodyStr) {

    let body = parseJSON(bodyStr);
    if(body == undefined){
        return 400;
    }

    if(!isBodyValid(bodyStr)){
        return 400;
    }

    if(url.replace('/', '') != 'calcCDBUnitPrice'){
        return 404;
    }

    if(method != 'GET'){
        return 405;
    }

    if(calculator.dateStrToNumber(body.investmentDate) < 20161114 || calculator.dateStrToNumber(body.currentDate) > 20161223){
        return 406;
    }

    return 200;
}

function handle(request = http.IncomingMessage) {

    let response = {
        status: 0,
        result: []
    };


    let buffers = [];

    for await (const chunk of req) {
        buffers.push(chunk);
    }

    let bodyStr = Buffer.concat(buffers).toString();

    let status = isRequestValid(request.url, request.method, bodyStr);

    if(status == 200){

        response.status = 200;
        let body = parseJSON(bodyStr);
        response.result = calculator.calcCDBUnitPrice(body);

    }
    else{
        response.status = status;
    }

    return response;
    
}

exports.handle = handle;