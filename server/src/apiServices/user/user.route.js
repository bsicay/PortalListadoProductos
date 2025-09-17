import express from 'express';
import {
  createUserController,
  getUserController,
  getMeController,
} from './user.controller.js';
import validateBody from '../../middlewares/validateBody.js';
import createUserSchema from './validationSchemas/createUserSchema.js';
import ensureAdminAuth from '../../middlewares/ensureAdminAuth.js';
import ensureRefreshTokenAuth from '../../middlewares/ensureRefreshTokenAuth.js';

const userRouter = express.Router();

// Crear usuario (solo administradores)
userRouter.post('/', ensureAdminAuth, validateBody(createUserSchema), createUserController);

// Obtener datos del usuario actual (autenticado)
userRouter.get('/me', ensureRefreshTokenAuth, getMeController);

// Obtener usuario por ID (autenticado)
userRouter.get('/:idUser', ensureRefreshTokenAuth, getUserController);

export default userRouter;
