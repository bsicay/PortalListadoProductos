import express from 'express';
import {
  createUserController,
  getUserController,
} from './user.controller.js';
import validateBody from '../../middlewares/validateBody.js';
import createUserSchema from './validationSchemas/createUserSchema.js';
import ensureAdminAuth from '../../middlewares/ensureAdminAuth.js';
import ensureRefreshTokenAuth from '../../middlewares/ensureRefreshTokenAuth.js';

const userRouter = express.Router();

// Crear usuario (solo administradores)
userRouter.post('/', ensureAdminAuth, validateBody(createUserSchema), createUserController);

// Obtener usuario por ID (autenticado)
userRouter.get('/:idUser', ensureRefreshTokenAuth, getUserController);

export default userRouter;
