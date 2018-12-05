//============================================================================
//modules and global variables
//============================================================================

const cluster = require('cluster');
const cpuCount = require('os').cpus().length;
const {goodbye} = require('../HelperFunctions/helperFuncs.js');

//============================================================================
//helper functions
//============================================================================

const sayHello = (wid) => {
    console.log(`Hi! I'm worker #${wid} running on thread #${process.pid}`);
}

const killInColdBlood = (wid) => {
    process.send(goodbye(wid))
    process.kill(process.pid, 'SIGKILL');
}

//============================================================================
//if this is a worker
//============================================================================

if (cluster.isWorker) {
  process.on('message', (msg) => {
    let wid = msg;
    sayHello(wid);
    setTimeout( () => {
      killInColdBlood(wid);
    }, 3000)
  })

//============================================================================
//if this is the master (i.e. cluster.isMaster === true)
//============================================================================
} else {
  let numOfWorkers = 4;
  for (let i = 0; i < numOfWorkers; i++) {
    let worker = cluster.fork();
    let wid = i;
    worker.send(wid);
    worker.on('message', (msg) => {
      console.log(msg)
    })
  }
}