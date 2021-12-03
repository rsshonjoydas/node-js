import app from './app';

// TODO: App Configuration
const APP_PORT = process.env.APP_PORT || 5000

app.listen(APP_PORT, () => {
  console.log(`Listening on port ${APP_PORT}`);
})