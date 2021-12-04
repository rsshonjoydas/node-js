import app from './app';
import { errorLogger, infoLogger } from './logger';
import { connectWithDB, options, uri } from './mongodb';

// TODO: App Configuration
const APP_PORT = process.env.APP_PORT || 5000

app.listen(APP_PORT, () => {
  // TODO: Info Logger Configuration
  if (process.env.ENVIRONMENT !== 'development')
    app.use(infoLogger)

  // TODO: Database Connection
  connectWithDB()

  // TODO: Error Logger Configuration
  if (process.env.ENVIRONMENT !== 'development')
    app.use(errorLogger(uri, options))

  console.log(`Listening on port ${APP_PORT}`);
})