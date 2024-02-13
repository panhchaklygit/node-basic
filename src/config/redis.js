const Redis = require('ioredis');

// Create a Redis client
const redis = new Redis({
  port: process.env.REDIS_PORT,          // Redis port
  host: process.env.REDIS_HOST,  // Redis host
  // Add other configuration options if required
});

// Handling connection events
redis.on('connect', () => {
  console.log('Connected to Redis server');
});

redis.on('error', (err) => {
  console.error('Error connecting to Redis:', err);
});

module.exports = redis;

// Set a key-value pair
// redis.set('myKey', 'myValue')
//   .then((result) => {
//     console.log('Key set:', result);

//     // Retrieve the value for the key
//     return redis.get('myKey');
//   })
//   .then((value) => {
//     console.log('Value for myKey:', value);

//     // Close the Redis connection
//     redis.disconnect();
//   })
//   .catch((err) => {
//     console.error('Error:', err);
//   });