import express from 'express'
import models from '../models'

const router = express.Router()

const getHandler = (req, res) => {
  res.send('Hello World ' + req.query.id)
}

const postHandler = (req, res) => {
  const body = req.body
  const user = new models.User({ username: body.username, createdAt: new Date() })
  user.save().then((result) => {
    res.status(200).send('User saved successfully with id: ' + result._id)
  }).catch((err) => {
    res.status(500).send(err)
  })
}

// ! routes
router.get('/', getHandler)
router.post('/', postHandler)

const configure = (app) => {
  app.use('/users', router)
}

export default configure