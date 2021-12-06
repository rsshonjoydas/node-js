import express from 'express';
import swaggerUi from 'swagger-ui-express';
import config from './config';
import { errorLogger, infoLogger } from './logger';
import { handleError, processRequest } from './middlewares';
import { options, uri } from './mongodb';
import routes from './routes';
import swaggerDocument from './swagger.json';

// TODO: Express JS Configuration
const app = express()
app.use(express.json())

// TODO: Info Logger Configuration
if (config.APP_ENVIRONMENT !== 'development')
  app.use(infoLogger())

// TODO: Correlation Id
app.use(processRequest)

// TODO: Routes Configuration
routes(app)

// TODO: Swagger Configuration
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// TODO: Error Logger Configuration
if (config.APP_ENVIRONMENT !== 'development')
  app.use(errorLogger(uri, options))

// TODO: Error Handler
app.use(handleError);

export default app;