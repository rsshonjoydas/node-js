import app from './app';
import config from './config';
import { connectDBWithRetry } from './mongodb';

// TODO: App Configuration
const APP_PORT = config.APP_PORT;

app.listen(APP_PORT, () => {
  // TODO: Database Connection
  connectDBWithRetry()

  console.log(`App listening on port ${APP_PORT}`);
})