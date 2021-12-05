import app from './app';
import { connectWithDB } from './mongodb';

// TODO: App Configuration
const APP_PORT = process.env.APP_PORT || 5000

app.listen(APP_PORT, () => {
  // TODO: Database Connection
  connectWithDB()

  console.log(`Listening on port ${APP_PORT}`);
})