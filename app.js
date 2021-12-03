import dotenv from 'dotenv';
import express from 'express';
import expressWinston from 'express-winston';
import winston from 'winston';
import 'winston-daily-rotate-file';
import { ElasticsearchTransport } from 'winston-elasticsearch';
import 'winston-mongodb';
import configure from './controllers';
import { handleError } from './middlewares/handleError';
import { processRequest } from './middlewares/processRequest';
import { connectWithDB, options, uri } from './mongodb';

// TODO: Express JS Configuration
const app = express()
app.use(express.json())

// TODO: dotenv Configuration
dotenv.config()

const getMessage = (req, res) => {
  let obj = {
    correlationId: req.headers['x-correlation-id'],
    requestBody: req.body
  }
  return JSON.stringify(obj)
}

const fileInfoTransport = new (winston.transports.DailyRotateFile)(
  {
    filename: 'log-info-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
  }
);

const fileErrorTransport = new (winston.transports.DailyRotateFile)(
  {
    filename: 'log-error-%DATE%.log',
    datePattern: 'yyyy-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
  }
);

const mongoErrorTransport = new (winston.transports.MongoDB)({
  db: uri,
  metaKey: 'meta',
  options,
})

const elasticsearchOptions = {
  level: 'info',
  clientOpts: { node: 'http://localhost:9200' },
  indexPrefix: 'log-elasticsearch'
}

const esTransport = new (ElasticsearchTransport)(elasticsearchOptions)

const infoLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console(),
    fileInfoTransport,
    esTransport
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true,
  // msg: 'This is a {{req.method}} request from {{req.url}}'
  msg: getMessage
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.Console(),
    fileErrorTransport,
    mongoErrorTransport,
    esTransport
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true,
  msg: '{ "correlationId": "{{req.headers["x-correlation-id"]}}", "error": "{{err.message}}" }'
});

// TODO: Logger Configuration
app.use(infoLogger)

// TODO: Database Connection
connectWithDB()

// TODO: Correlation Id
app.use(processRequest)

// TODO: Routes Configuration
configure(app)

// TODO: Error Handler
app.use(errorLogger)
app.use(handleError);

export default app;