import express from 'express'
import { saveUser } from '../services/userServices'

const router = express.Router()

const getHandler = (req, res) => {
  res.send('Hello World ' + req.query.id)
}

const postHandler = async (req, res) => {
  const body = req.body;
  const user = await saveUser(body);
  res.send(user._id)
}

// ! routes
router.get('/', getHandler)
router.post('/', postHandler)

const configure = (app) => {
  app.use('/users', router)
}

export default configure