//record start time
const {reformatTime} = require('../HelperFunctions/helperFuncs.js');
const startTime = Date.now();
//============================================================================



const cpuCount = require('os').cpus().length;


let oneBillion = 1000000000;
let threeBillion = oneBillion * 3
let count = 0;

for (let i = 1; i < threeBillion + 1; i++) {
    count++
    // if (i % oneBillion === 0) {
    //     console.log(i)
    // }
}



//============================================================================
//record end time and log the elapsed time
const endTime = Date.now();
const timeElapsed = endTime - startTime;
console.log()
console.log('===========================')
console.log('Count Total: ' + count);
console.log('Total Time: ' + reformatTime(timeElapsed));