import dotenv from 'dotenv';
import express from 'express';
import configureRoutes from './controllers';
import { handleError, processRequest } from './middlewares';

// TODO: Express JS Configuration
const app = express()
app.use(express.json())

// TODO: dotenv Configuration
dotenv.config()

// TODO: Correlation Id
app.use(processRequest)

// TODO: Routes Configuration
configureRoutes(app)

// TODO: Error Handler
app.use(handleError);

export default app;