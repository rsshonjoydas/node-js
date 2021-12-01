import express from 'express';
import models from './models';
import connectWithDB from './mongodb';

const port = 5000
const app = express()

app.use(express.json())

const log = (msg) => console.log(msg);

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
  console.log("Listening on port " + port);
})

log(models);