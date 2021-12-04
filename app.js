import dotenv from 'dotenv';
import express from 'express';
import configure from './controllers';
import { errorLogger, infoLogger } from './logger';
import { handleError } from './middlewares/handleError';
import { processRequest } from './middlewares/processRequest';
import { connectWithDB } from './mongodb';

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
app.use(errorLogger)
app.use(handleError);

export default app;