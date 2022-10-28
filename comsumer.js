const { Queue, Worker, QueueScheduler } = require('bullmq')

const redisConfiguration = {
  connection: {
    host: "localhost",
    port: 6379,
    // username: "default",
    // password: "redispw"
  }
}

function sendEmail(job) {
  const { email, message } = job.data;
  console.log(`Message ${message} was sent to ${email}.`)
}
function resolveQueue(queue) {
  // setTimeout(() => {
  //   console.log(`Resolved queue`);
  //   console.log(queue.data);
  // }, 3000)
  console.log('111111');
  
}

const worker = new Worker('emailSchedule', resolveQueue, redisConfiguration);
// const worker = new Worker('emailSchedule', resolveQueue, redisConfiguration);

worker.on('completed', job => {
  console.info(`${job.id} has completed!`);

});

worker.on('failed', (job, err) => {
  console.error(`${job.id} has failed with ${err.message}`);
});