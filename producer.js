const { Queue, QueueScheduler } = require('bullmq')

// Add your own configuration here
const redisConfiguration = {
  connection: {
    host: "localhost",
    port: 6379,
    // username: "default",
    // password: "redispw"
  }
}

// Delayed jobs will only be processed if there is at least one QueueScheduler instance configured in the Queue.
// new QueueScheduler('emailSchedule', redisConfiguration );

const myQueue = new Queue('emailSchedule', redisConfiguration);

async function emailSchedule(email, message, delay) {
  console.log('running producer email schedule: ', email, message, delay);
  await myQueue.add('email', { email: email, message: message }, { delay});
}
setInterval(() => {
  emailSchedule('zxc','vbn', 1000)
}, 100);
