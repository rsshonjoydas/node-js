import express from 'express';
import configure from './controllers';
import { handleError } from './middlewares/handleError';
import connectWithDB from './mongodb';

const port = 5000
const app = express()

app.use(express.json())

connectWithDB()

configure(app)

app.use(handleError);

app.listen(port, () => {
  console.log("Listening on port " + port);
})
