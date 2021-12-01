import express from 'express'
import { deleteUser, getAllUsers, saveUser, updateUser } from '../services/userServices'

const router = express.Router()

const getHandler = async (req, res, next) => {
  try {
    const users = await getAllUsers()
    res.status(200).send(users)
  } catch (error) {
    return next(error, req, res);
  }
}

const postHandler = async (req, res, next) => {
  try {
    const body = req.body;
    const user = await saveUser(body);
    res.status(201).send(user._id)
  } catch (error) {
    return next(error, req, res);
  }
}

const putHandler = async (req, res, next) => {
  try {
    const body = req.body;
    const user = await updateUser(body)
    res.status(200).send(user._id)
  } catch (error) {
    return next(error, req, res);
  }
}

const deleteHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteUser(id)
    res.status(200).send("User Deleted Successfully")
  } catch (error) {
    return next(error, req, res);
  }
}

// ! routes
router.get('/', getHandler)
router.post('/', postHandler)
router.put('/', putHandler)
router.delete('/:id', deleteHandler)

const configure = (app) => {
  app.use('/users', router)
}

export default configure