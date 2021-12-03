import express from 'express';
import expressWinston from 'express-winston';
import winston from 'winston';
import configure from './controllers';
import { handleError } from './middlewares/handleError';
import { processRequest } from './middlewares/processRequest';
import connectWithDB from './mongodb';
// import winstonFile from 'winston-daily-rotate-file'
// import winstonMongo from 'winston-mongodb'
// import {ElasticsearchTransport} from 'winston-elasticsearch'

const port = 5000
const app = express()

app.use(express.json())

const getMessage = (req, res) => {
  let obj = {
    correlationId: req.headers['x-correlation-id'],
    requestBody: req.body
  }
  return JSON.stringify(obj)
}

const infoLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true,
  // msg: 'This is a {{req.method}} request from {{req.url}}'
  msg: getMessage
})

// TODO: Logger Configuration
app.use(infoLogger)

// TODO: Database Connection
connectWithDB()

// TODO: Correlation Id
app.use(processRequest)

// TODO: Routes Configuration
configure(app)

// TODO: Error Handler
app.use(handleError);

app.listen(port, () => {
  console.log("Listening on port " + port);
})
