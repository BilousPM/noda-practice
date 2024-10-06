import createHttpError from 'http-errors';
import { findSessionByToken, findUserById } from '../services/user.js';

export const authenticate = async (req, res, next) => {
  const authorization = req.get('Authorization');

  if (!authorization) {
    return next(createHttpError(401, 'Unauthorized'));
  }

  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return next(createHttpError(401, 'Unauthorized'));
  }

  const session = await findSessionByToken(token);
  if (!session) {
    return next(createHttpError(401, 'Unauthorized'));
  }

  const isTokenExpired = new Date() > new Date(session.accessTokenValidUntil);
  if (isTokenExpired) {
    return next(createHttpError(401, 'Unauthorized'));
  }

  const user = await findUserById(session.userId);

  if (!user) {
    return next(createHttpError(401, 'Unauthorized'));
  }

  req.user = user;
  next();
};
