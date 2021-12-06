import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import config from './config';
import { errorLogger, infoLogger } from './logger';
import { handleError, processRequest } from './middlewares';
import { options, uri } from './mongodb';
import routes from './routes';
import swaggerDocument from './swagger.json';

// TODO: express-rate-limit options
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000 // limit each IP to 1000 requests per windowMs
});

// TODO: Express JS Configuration
const app = express()
app.use(express.json())

// TODO: Necessary Packages
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(compression())
app.use(cors())
app.use(helmet())
app.use(limiter)

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