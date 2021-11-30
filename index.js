import express from 'express';

const port = 5000
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World ' + req.query.id)
})

app.listen(port, () => {
  console.log("Listening on port" + port);
})