class CDBInput{
    investmentDate = '';
    cdbRate = 0;
    currentDate = '';
}

const validDates = {
    1114: { date: '2016-11-14',  next: 1116 }, 
    1116: { date: '2016-11-16',  next: 1117 },
    1117: { date: '2016-11-17',  next: 1118 },
    1118: { date: '2016-11-18',  next: 1121 },
    1121: { date: '2016-11-21',  next: 1122 },
    1122: { date: '2016-11-22',  next: 1123 },
    1123: { date: '2016-11-23',  next: 1124 },
    1124: { date: '2016-11-24',  next: 1125 },
    1125: { date: '2016-11-25',  next: 1128 },
    1128: { date: '2016-11-28',  next: 1129 },
    1129: { date: '2016-11-29',  next: 1130 },
    1130: { date: '2016-11-30',  next: 1201 },
    1201: { date: '2016-12-01',  next: 1202 },
    1202: { date: '2016-12-02',  next: 1205 },
    1205: { date: '2016-12-05',  next: 1206 },
    1206: { date: '2016-12-06',  next: 1207 },
    1207: { date: '2016-12-07',  next: 1208 },
    1208: { date: '2016-12-08',  next: 1209 },
    1209: { date: '2016-12-09',  next: 1212 },
    1212: { date: '2016-12-12',  next: 1213 },
    1213: { date: '2016-12-13',  next: 1214 },
    1214: { date: '2016-12-14',  next: 1215 },
    1215: { date: '2016-12-15',  next: 1216 },
    1216: { date: '2016-12-16',  next: 1219 },
    1219: { date: '2016-12-19',  next: 1220 },
    1220: { date: '2016-12-20',  next: 1221 },
    1221: { date: '2016-12-21',  next: 1222 },
    1222: { date: '2016-12-22',  next: 1223 },
    1223: { date: '2016-12-23',  next: -1 },
};

const CDI = [ 13.88, 13.63];

function dateStrToNumber(dateStr = ''){
    return Number.parseInt(dateStr.substr(8, 2)) + (Number.parseInt(dateStr.substr(5, 2))*100);
}

function calcCDBUnitPrice(body = CDBInput) {

    let resultArray = [];
    let investDate = dateStrToNumber(body.investmentDate);
    let currentDate = dateStrToNumber(body.currentDate);

    while(validDates[investDate] == undefined){
        investDate++;
    }

    while(validDates[currentDate] == undefined){
        currentDate++;
    }

    let index = investDate;
    let tCDI = 1;
    while(index != -1){

        let CDIk;
        if(index < 1200){
            CDIk = CDI[0];
        }
        else{
            CDIk = CDI[1];
        }

        let tCDIk = Math.pow((CDIk/100)+1, (1/252)) - 1;

        tCDI *= 1 + tCDIk*body.cdbRate/100;

        let unitPrice = 1000*tCDI;

        let result = { date: validDates[index].date, unitPrice: unitPrice};

        resultArray.push(result);

        index = validDates[index].next;
    }

    return resultArray;

}

exports.dateStrToNumber = dateStrToNumber;
exports.calcCDBUnitPrice = calcCDBUnitPrice;