import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config()

export const uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

export const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 1000,
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
}

export const connectWithDB = () => {
  mongoose.connect(uri, options, (err) => {
    if (err) console.error(err);
    else console.log("database connection")
  })
}
