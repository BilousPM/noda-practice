import { Router } from 'express';
import { loginSchema, registerSchema } from '../validation/user.js';
import { validateBody } from '../utils/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  logoutController,
  refreshUser,
  registerUserController,
} from '../controllers/user.js';
import { authenticate } from '../middlewares/authenticate.js';
const authRouter = Router();

authRouter.post(
  '/signup',
  validateBody(registerSchema),
  ctrlWrapper(registerUserController),
);

authRouter.post(
  '/login',
  validateBody(loginSchema),
  ctrlWrapper(loginUserController),
);

authRouter.post('/logout', authenticate, ctrlWrapper(logoutController));
authRouter.get('/current', authenticate, ctrlWrapper(refreshUser));

export default authRouter;
