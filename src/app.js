import dotenv from 'dotenv';
import express from 'express';
import configure from './controllers';
import { errorLogger, infoLogger } from './logger';
import { handleError, processRequest } from './middlewares';
import { connectWithDB, options, uri } from './mongodb';

// TODO: Express JS Configuration
const app = express()
app.use(express.json())

// TODO: dotenv Configuration
dotenv.config()

console.log(process.env.ENVIRONMENT);

// TODO: Logger Configuration
if (process.env.ENVIRONMENT !== 'development')
  app.use(infoLogger)

// TODO: Database Connection
connectWithDB()

// TODO: Correlation Id
app.use(processRequest)

// TODO: Routes Configuration
configure(app)

// TODO: Error Handler
if (process.env.ENVIRONMENT !== 'development')
  app.use(errorLogger(uri, options))

app.use(handleError);

export default app;