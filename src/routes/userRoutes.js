import express from 'express'
import { deleteHandler, getByIdHandler, getHandler, postHandler, putHandler } from "../controllers/userController"
import { handleValidation } from "../middlewares"
import validators from "../models/request-models"

const router = express.Router()

// ! routes
router.get('/', getHandler)
router.get('/:id', getByIdHandler)
router.post('/', handleValidation(validators.userSchemaValidator), postHandler)
router.put('/', putHandler)
router.delete('/:id', deleteHandler)

export default router;