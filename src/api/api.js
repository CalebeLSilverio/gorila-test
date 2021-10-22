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

    if(!isBodyValid(body)){
        return 400;
    }

    if(url.replace('/', '') != 'calcCDBUnitPrice'){
        return 404;
    }

    if(method != 'GET'){
        return 405;
    }

    if(calculator.dateStrToNumber(body.investmentDate) < 1114 || calculator.dateStrToNumber(body.currentDate) > 1223){
        return 406;
    }

    return 200;
}

function calcCDBUnitPrice(bodyStr) {

    let response = {
        status: 0,
        result: []
    };

    response.status = 200;
    let body = parseJSON(bodyStr);
    response.result = calculator.calcCDBUnitPrice(body);

    return response;
}

function handle(request = http.IncomingMessage, bodyStr) {

    let status = isRequestValid(request.url, request.method, bodyStr);

    if(status == 200){

        if(request.url == '/calcCDBUnitPrice'){
            return calcCDBUnitPrice(bodyStr);
        }

    }
    else{
        return {status: status};
    }
    
}

exports.handle = handle;