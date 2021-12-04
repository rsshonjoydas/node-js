import expressWinston from 'express-winston';
import winston from 'winston';
import 'winston-daily-rotate-file';
import { ElasticsearchTransport } from 'winston-elasticsearch';
import 'winston-mongodb';

const getMessage = (req, res) => {
  let obj = {
    correlationId: req.headers['x-correlation-id'],
    requestBody: req.body
  }
  return JSON.stringify(obj)
}

const mongoErrorTransport = (uri, options) => new (winston.transports.MongoDB)({
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

export const infoLogger = () => expressWinston.logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.DailyRotateFile(
      {
        filename: 'log-info-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d'
      }
    ),
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

export const errorLogger = (uri, options) => expressWinston.errorLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.DailyRotateFile(
      {
        filename: 'log-error-%DATE%.log',
        datePattern: 'yyyy-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d'
      }
    ),
    mongoErrorTransport(uri, options),
    esTransport
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: true,
  msg: '{ "correlationId": "{{req.headers["x-correlation-id"]}}", "error": "{{err.message}}" }'
});