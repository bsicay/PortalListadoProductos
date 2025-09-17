import express from 'express';
import {
  createProductController,
  getProductController,
  getAllProductsController,
  getPublicProductsController,
  updateProductController,
  deleteProductController,
} from './product.controller.js';
import validateBody from '../../middlewares/validateBody.js';
import createProductSchema from './validationSchemas/createProductSchema.js';
import updateProductSchema from './validationSchemas/updateProductSchema.js';
import ensureAdminAuth from '../../middlewares/ensureAdminAuth.js';
import ensureCollaboratorAuth from '../../middlewares/ensureCollaboratorAuth.js';
import ensureRefreshTokenAuth from '../../middlewares/ensureRefreshTokenAuth.js';

const productRouter = express.Router();

// Ruta pública - Productos con inventario > 5
productRouter.get('/public', getPublicProductsController);

// Rutas protegidas - Requieren autenticación
productRouter.get('/', ensureRefreshTokenAuth, getAllProductsController);
productRouter.get('/:id', ensureRefreshTokenAuth, getProductController);

// Rutas para colaboradores y administradores (crear y actualizar)
productRouter.post('/', ensureCollaboratorAuth, validateBody(createProductSchema), createProductController);
productRouter.put('/:idProduct', ensureCollaboratorAuth, validateBody(updateProductSchema), updateProductController);

// Ruta solo para administradores (eliminar)
productRouter.delete('/:id', ensureAdminAuth, deleteProductController);

export default productRouter;
