import express from 'express';
import userRouter from '../apiServices/user/user.route.js';
import sessionRouter from '../apiServices/session/session.route.js';
import productRouter from '../apiServices/product/product.route.js';
import consts from '../utils/consts.js';

const router = express.Router();

const { apiPath } = consts;

router.use(`${apiPath}/user`, userRouter);
router.use(`${apiPath}/session`, sessionRouter);
router.use(`${apiPath}/products`, productRouter);

router.get('*', (req, res) => {
  res.sendFile(`${global.dirname}/public/index.html`);
});
export default router;
