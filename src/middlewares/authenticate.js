import createHttpError from 'http-errors';
import { findUserById } from '../services/user.js';
import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';

export const authenticate = async (req, res, next) => {
  const authorization = req.get('Authorization');

  if (!authorization) {
    return next(createHttpError(401, 'Unauthorized'));
  }

  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return next(createHttpError(401, 'Unauthorized'));
  }

  const { id } = jwt.verify(token, env('JWT_SECRET'));

  const user = await findUserById(id);

  if (!user || !user.token) {
    return next(createHttpError(401, 'Unauthorized'));
  }

  req.user = user;
  next();
};
