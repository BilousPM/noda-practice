import { Router } from 'express';
import { loginSchema, registerSchema } from '../validation/user.js';
import { validateBody } from '../utils/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  registerUserController,
} from '../controllers/user.js';

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

export default authRouter;
