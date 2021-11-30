import express from 'express';
import models from './models/index.js';

const port = 5000
const app = express()

app.use(express.json())

const log = (msg) => console.log(msg);

app.get('/', (req, res) => {
  res.send('Hello World ' + req.query.id)
})

app.post('/', (req, res) => {
  // const body = JSON.stringify(req.body)
  // res.send('Hello World for post request' + body)
  const body = req.body
  res.send('Hello World for post request ' + body.message)
})

app.listen(port, () => {
  console.log("Listening on port" + port);
})

log(models);