import express from 'express';
import configure from './controllers';
import { handleError } from './middlewares/handleError';
import { processRequest } from './middlewares/processRequest';
import connectWithDB from './mongodb';

const port = 5000
const app = express()

app.use(express.json())
app.use(processRequest)

connectWithDB()

configure(app)

app.use(handleError);

app.listen(port, () => {
  console.log("Listening on port " + port);
})

