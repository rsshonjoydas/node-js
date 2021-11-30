import express from 'express';
import mongoose from 'mongoose';
import models from './models/index.js';

const port = 5000
const app = express()

app.use(express.json())

const log = (msg) => console.log(msg);

const uri = 'mongodb://localhost:27017/nodejs';
const options = {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
}

const connectWithDB = () => {
  mongoose.connect(uri, options, (err, db) => {
    if (err) console.error(err);
    else log("database connection")
  })
}

connectWithDB()

app.get('/', (req, res) => {
  res.send('Hello World ' + req.query.id)
})

app.post('/', (req, res) => {
  // const body = JSON.stringify(req.body)
  // res.send('Hello World for post request' + body)
  const body = req.body
  const user = new models.User({ username: body.username, createdAt: new Date() })
  user.save().then((result) => {
    res.status(200).send('User saved successfully with id: ' + result._id)
  }).catch((err) => {
    res.status(500).send(err)
  })
})

app.listen(port, () => {
  console.log("Listening on port" + port);
})

log(models);