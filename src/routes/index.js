import express from 'express';
import userRoutes from './userRoutes';

let router = express.Router();

router.use('/users', userRoutes);

const configure = (app) => {
  app.use(router)
}

export default configure;
