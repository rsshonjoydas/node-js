import express from 'express'
import userController from "../controllers/userController"
import { handleValidation } from "../middlewares"
import validators from "../models/request-models"

const router = express.Router()

// ! routes
router
  .get('/', userController.getHandler)
  .get('/:id', userController.getByIdHandler)
  .post('/', handleValidation(validators.userSchemaValidator), userController.postHandler)
  .put('/', userController.putHandler)
  .delete('/:id', userController.deleteHandler)

export default router;