const http = require('http');
const calculator = require('./svc/CBDcalculator');

/**
 * parse a JSON string to an object
 * @param {The string to be parsed} str 
 * @returns The parsed object
 */
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

/**
 * Verifies if the JSON object specified in the request's body has all the input parameters needed
 * @param {The object representing the body of the request} body 
 * @returns true if all the required parameters are set. Returns false otherwise
 */
function isBodyValid(body){

    if(body.investmentDate == undefined || body.cdbRate == undefined || body.currentDate == undefined){
        return false;
    }

    return true;
}

/**
 * Verifies if the request has a valid body, if it's requesting the calcCDBUnitPrice service,
    if it's a GET request and if the date range is suported by the stored data
 * @param {The request's URL} url 
 * @param {The request's method} method 
 * @param {The request's body} bodyStr 
 * @returns The status of the server's response
 */
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

/**
 * Builds the response object and calls calculator.calcCDBUnitPrice();
 * @param {The stingfied JSON object containing the body of the request} bodyStr 
 * @returns An array of objects {date: String, unitPrice: Number} containing all te CDB unit prices since the investment date to current date
 */
function calcCDBUnitPrice(bodyStr) {

    
    let body = parseJSON(bodyStr);
    return calculator.calcCDBUnitPrice(body);
}


/**
 * Handles requests from the server 
 * @param {The request that arived on th server} request 
 * @param {The body of the request} bodyStr 
 * @returns An object containing the status of the server's response and the array of values {date: String, unitPrice: Number}
 */
function handle(request = http.IncomingMessage, bodyStr) {

    let status = isRequestValid(request.url, request.method, bodyStr);

    if(status == 200){

        if(request.url == '/calcCDBUnitPrice'){

            let response = {
                status: 200,
                result: calcCDBUnitPrice(bodyStr)
            };

            return response;
        }

    }
    else{
        return {status: status};
    }
    
}

exports.handle = handle;