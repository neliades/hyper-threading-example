# hyper-threading-example
This repository will demonstrate the use of multi- / hyper- threading.

After cloning, run npm install within the repository.

You can test out the various files by running these scripts:
//a basic cluster example:
  npm run cluster
//a basic cluster example with messages sent between master and workers:
  npm run messages
//a basic vanilla javascript, single threaded example that tracks the time it takes to count to one billion
  npm run vanilla
//a complex cluster, multi-threaded example that tracks the time it takes to count to one billion
  npm run complex
  
*If you've run the vanilla example + the complex example and the time elapsed for each is very close, what is likely happening is that your cpu is processing the single thread so quickly that in the time it takes the multiple threads to spin up, the single thread has already made significant progress.  If this is the case, try incrementing the count total by a factor of 10 (e.g. 10 Billion) and again and again until you see a significant difference in the times elapsed.  The JS interpreter has to take a few seconds to read the cluster module and re-read the js file for every cluster() invocation, so it contributes to a major % of the time elapsed when the total process is less than 10 seconds long.  When the process takes a few minutes or an hour or more, the few seconds used to initialize the clusters do not contribute to the total elapsed time significantly.
