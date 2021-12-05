import express from 'express'
import { handleValidation } from '../middlewares'
import validators from '../models/view-model'
import { deleteUser, getAllUsers, getUserById, saveUser, updateUser } from '../services/userServices'
import { NotFound } from '../utils/error'

const router = express.Router()

const getHandler = async (req, res, next) => {
  try {
    const users = await getAllUsers()
    res.status(200).send(users)
  } catch (error) {
    return next(error, req, res);
  }
}

const getByIdHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await getUserById(id)
    if (user) {
      res.status(200).send(user)
    } else {
      throw new NotFound('user not found', id)
    }
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
router.get('/:id', getByIdHandler)
router.post('/', handleValidation(validators.userSchemaValidator), postHandler)
router.put('/', putHandler)
router.delete('/:id', deleteHandler)

const configure = (app) => {
  app.use('/users', router)
}

export default configure