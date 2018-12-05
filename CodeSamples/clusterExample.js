//============================================================================
//modules and global variables
//============================================================================

const cluster = require('cluster');
const cpuCount = require('os').cpus().length;

//============================================================================
//helper functions
//============================================================================

const sayHello = () => {
    console.log(`Hi! I'm a worker running on thread #${process.pid}`);
}
const killInColdBlood = () => {
    process.kill(process.pid, 'SIGKILL');
}

//============================================================================
//if this is a worker
//============================================================================

if (cluster.isWorker) {
    sayHello();
    setTimeout( () => {
        killInColdBlood();
    }, 3000)

//============================================================================
//if this is the master (i.e. cluster.isMaster === true)
//============================================================================
} else {
  let numOfWorkers = 4;
  for (let i = 0; i < numOfWorkers; i++) {
    cluster.fork();
  }
}