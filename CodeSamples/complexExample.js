//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//record start time
const {reformatTime} = require('../HelperFunctions/helperFuncs.js');
const startTime = Date.now();
//============================================================================
//modules and global variables
//============================================================================

const cluster = require('cluster');
const cpuCount = require('os').cpus().length;

let oneBillion = 1000000000;
let threeBillion = oneBillion * 3;
let oneHundredMillion = oneBillion / 10;
let workerNum;

//============================================================================
//function that iterates a billion times, starting from the 
//============================================================================
let countToBillion = (start, end) => {
    //iterate from this worker's start and end
    for (let i = start + 1; i < end; i++) {
      /*
      //>>>>>>>>>>>>>
      //if you want to watch each worker count simultaneously, uncomment the section
      //>>>>>>>>>>>>>
      if (i % oneHundredMillion === 0) {
         console.log(i + ' on worker #' + workerNum);
      }
      */
    }
    //record end time and log the elapsed time
    let endTime = Date.now();
    let timeElapsed = endTime - startTime;
    //inform the master that the worker's job is done and send the time
    process.send({
        stop: 'stop',
        timeElapsed
    });
    //kill the worker
    process.kill(process.pid, 'SIGKILL');
}


//============================================================================
//if this is a worker
//============================================================================

if (cluster.isWorker) {
  //listen for a message from the master
  process.on('message', (msg) => {
    workerNum = msg.num;
    console.log(`worker #${workerNum} running on thread #${process.pid} initiated`);
    //if the master sent the worker number, the start value, and the end value
    if (msg.num !== undefined && msg.start !== undefined && msg.end !== undefined) {
      console.log(`worker #${msg.num} starting count at ` + msg.start);
      //invoke the count using the provided start and end values
      countToBillion(msg.start, msg.end);
    }
  })

//============================================================================
//if this is the master (i.e. cluster.isMaster === true)
//============================================================================
} else {
  //specify the number of workers (optimally the total number of available processors)
  let numOfWorkers = cpuCount;
  //determine an increment to divide up the work based on the desired sum and the total processors
  let increment = Math.floor(threeBillion / numOfWorkers);
  let start = 0;
  let end = 0;
  //save a count of the workers - this will be important later!
  let workers = 0;
  //for each available processor
  for (let i = 0; i < numOfWorkers; i++) {
    //spin up a cluster (i.e. a new process);
    worker = cluster.fork();
    //add to the count of workers - like I said, important!
    workers++;
    //if this is the last worker, make sure the start/end include the entire remaining range of numbers
    if (i === numOfWorkers) {
        start = threeBillion - start;
        end = threeBillion;
    //if this is not the last worker, just increment off of the previous
    } else {
        start = i * increment;
        end = start + increment;
    }
    //send a message to the current worker with the worker number, the start value, and the end value
    worker.send({num : i, start, end});
    //listen for a message from the worker
    worker.on('message', (msg) => {
      if (msg.stop !== undefined) {
        //the worker has been killed - decrease the worker count
        workers--;
        //if ALL workers have been killed, we're done! use the count that this last worker sent in its dying breath and log the elapsed time!
        if (workers === 0) {
          console.log('Total Time: ' + reformatTime(msg.timeElapsed));
        }
      }
    })
  }
}