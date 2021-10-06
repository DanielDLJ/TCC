const _ = require("lodash"); 
const moment = require('moment');
const defaultDate = '2021-04-01 05:00:00'
// Nome       Recomendado      Sorocaba
// pH          6,0 - 9,5         7,0
// Turbidez        5             0,26
function good(sizeData) {
    const firstDate = moment(defaultDate,'YYYY-MM-DD HH:mm:ss')
    let dataArray = []
    let ph = 6
    let turbidity = 3
    for(let i = 0 ; i < sizeData; i++){
        const up = _.random(0, 1)
        if(up === 1){//up
            if(ph < 8) ph += 0.05
            if(turbidity < 4.8) turbidity += 0.05
        }else {//decrese
            if(ph > 5.4) ph -= 0.05
            if(turbidity < 1.2) turbidity -= 0.05
        }
        dataArray.push({
            ph,
            turbidity,
            date: firstDate.add(i, "days").format('YYYY-MM-DD HH:mm:ss').toString()
        })
    }
    return dataArray;
}

// Nome       Recomendado      Sorocaba
// pH          6,0 - 9,5         7,0
// Turbidez        5             0,26
function normal(sizeData) {
    const firstDate = moment(defaultDate,'YYYY-MM-DD HH:mm:ss')
    let dataArray = []
    let ph = 6
    let turbidity = 4
    for(let i = 0 ; i < sizeData; i++){
        const up = _.random(0, 1)
        if(up === 1){//up
            if(ph < 8) ph += 0.09
            if(turbidity < 4.8) turbidity += 0.09
        }else {//decrese
            if(ph > 5.4) ph -= 0.09
            if(turbidity < 1.2) turbidity -= 0.09
        }
        dataArray.push({
            ph,
            turbidity,
            date: firstDate.add(i, "days").format('YYYY-MM-DD HH:mm:ss').toString()
        })
    }
    return dataArray;
}



// Nome       Recomendado      Sorocaba
// pH          6,0 - 9,5         7,0
// Turbidez        5             0,26
function bad(sizeData) {
    const firstDate = moment(defaultDate,'YYYY-MM-DD HH:mm:ss')
    let dataArray = []
    let ph = 6
    let turbidity = 4
    for(let i = 0 ; i < sizeData; i++){
        const up = _.random(0, 1)
        if(up === 1){//up
            if(ph < 13) ph += 0.9
            if(turbidity < 10) turbidity += 0.9
        }else {//decrese
            if(ph > 1) ph -= 0.9
            if(turbidity < 1.2) turbidity -= 0.9
        }
        dataArray.push({
            ph,
            turbidity,
            date: firstDate.add(i, "days").format('YYYY-MM-DD HH:mm:ss').toString()
        })
    }
    return dataArray;
}

// Nome       Recomendado      Sorocaba
// pH          6,0 - 9,5         7,0
// Turbidez        5             0,26
function bad2(sizeData) {
    const firstDate = moment(defaultDate,'YYYY-MM-DD HH:mm:ss')
    let dataArray = []
    let ph = 6
    let turbidity = 4
    for(let i = 0 ; i < sizeData; i++){
        const up = _.random(0, 1)
        if(up === 1){//up
            if(ph < 13) ph += 1
            if(turbidity < 15) turbidity += 1
        }else {//decrese
            if(ph > 1) ph -= 1
            if(turbidity < 1.2) turbidity -= 1
        }
        dataArray.push({
            ph,
            turbidity,
            date: firstDate.add(i, "days").format('YYYY-MM-DD HH:mm:ss').toString()
        })
    }
    return dataArray;
}









module.exports = function( sizeData ) {
    const dataSet = _.random(1, 3)
    if(dataSet === 1) return good(sizeData)
    if(dataSet === 2) return normal(sizeData)
    if(dataSet === 3) return bad(sizeData)
    if(dataSet === 4) return bad2(sizeData)
}