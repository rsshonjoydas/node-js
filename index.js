import express from 'express';
import configure from './controllers';
import models from './models';
import connectWithDB from './mongodb';

const port = 5000
const app = express()

app.use(express.json())

const log = (msg) => console.log(msg);

connectWithDB()

configure(app)

app.listen(port, () => {
  console.log("Listening on port " + port);
})

log(models);