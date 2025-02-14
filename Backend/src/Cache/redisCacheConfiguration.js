const redis = require('redis')
const client = redis.createClient({url:'redis://localhost:6379'})

client.on('error',(err) => console.error('Redis Error: ',err))

client.connect()

module.exports = client