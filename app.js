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

// TODO: Logger Configuration
app.use(infoLogger)

// TODO: Database Connection
connectWithDB()

// TODO: Correlation Id
app.use(processRequest)

// TODO: Routes Configuration
configure(app)

// TODO: Error Handler
app.use(errorLogger(uri, options))
app.use(handleError);

export default app;