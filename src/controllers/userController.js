import { deleteUser, getAllUsers, getUserById, saveUser, updateUser } from '../services/userServices'
import { NotFound } from '../utils/error'

export const getHandler = async (req, res, next) => {
  try {
    const users = await getAllUsers()
    res.status(200).send(users)
  } catch (error) {
    return next(error, req, res);
  }
}

export const getByIdHandler = async (req, res, next) => {
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

export const postHandler = async (req, res, next) => {
  try {
    const body = req.body;
    const id = await saveUser(body);
    res.status(201).send(id)
  } catch (error) {
    return next(error, req, res);
  }
}

export const putHandler = async (req, res, next) => {
  try {
    const body = req.body;
    const id = await updateUser(body)
    res.status(200).send(id)
  } catch (error) {
    return next(error, req, res);
  }
}

export const deleteHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteUser(id)
    res.status(200).send("User Deleted Successfully")
  } catch (error) {
    return next(error, req, res);
  }
}
