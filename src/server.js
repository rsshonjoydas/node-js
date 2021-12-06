import app from './app';
import { connectDBWithRetry } from './mongodb';

// TODO: App Configuration
const APP_PORT = process.env.APP_PORT || 5000

app.listen(APP_PORT, () => {
  // TODO: Database Connection
  connectDBWithRetry()

  console.log(`App listening on port ${APP_PORT}`);
})