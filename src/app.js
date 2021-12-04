import dotenv from 'dotenv';
import express from 'express';
import configure from './controllers';
import { handleError, processRequest } from './middlewares';

// TODO: Express JS Configuration
const app = express()
app.use(express.json())

// TODO: dotenv Configuration
dotenv.config()

// TODO: Correlation Id
app.use(processRequest)

// TODO: Routes Configuration
configure(app)

// TODO: Error Handler
app.use(handleError);

export default app;