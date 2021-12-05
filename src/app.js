import dotenv from 'dotenv';
import express from 'express';
import configureRoutes from './controllers';
import { errorLogger, infoLogger } from './logger';
import { handleError, processRequest } from './middlewares';
import { options, uri } from './mongodb';

// TODO: Express JS Configuration
const app = express()
app.use(express.json())

// TODO: dotenv Configuration
dotenv.config()

// TODO: Info Logger Configuration
if (process.env.ENVIRONMENT !== 'development')
  app.use(infoLogger())

// TODO: Correlation Id
app.use(processRequest)

// TODO: Routes Configuration
configureRoutes(app)

// TODO: Error Logger Configuration
if (process.env.ENVIRONMENT !== 'development')
  app.use(errorLogger(uri, options))

// TODO: Error Handler
app.use(handleError);

export default app;