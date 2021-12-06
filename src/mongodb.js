import mongoose from 'mongoose';
import config from './config';

export const uri = `mongodb://${config.MONGODB_HOST}:${config.MONGODB_PORT}/${config.MONGODB_NAME}`;
// export const uri = `mongodb://${config.MONGODB_USER}:${config.MONGODB_PASSWORD}@${config.MONGODB_IP}:${config.MONGODB_PORT}/?authSource=admin`

export const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 1000,
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
}

export const connectDBWithRetry = () => {
  mongoose
    .connect(uri, options)
    .then(() => console.log('Successfully connected to Database'))
    .catch((e) => {
      console.log(e)
      setTimeout(connectDBWithRetry, 5000);
    })
}