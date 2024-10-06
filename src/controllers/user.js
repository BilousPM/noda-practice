import createHttpError from 'http-errors';
import {
  findUserByEmail,
  createUser,
  createActiveSession,
} from '../services/user.js';
import bcrypt from 'bcrypt';
import { refreshTokenLifetime } from '../constants/constants.js';

export const registerUserController = async (req, res) => {
  const { email, name } = req.body;

  const user = await findUserByEmail(email);
  if (user) throw createHttpError(409, 'Email in use');
  await createUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: { email, name },
  });
};

export const loginUserController = async (req, res) => {
  const user = await findUserByEmail(req.body.email);
  if (!user) {
    throw createHttpError(401, 'Wrong credentials');
  }

  const isCorrectPassword = await bcrypt.compare(
    req.body.password,
    user.password,
  );
  if (!isCorrectPassword) {
    throw createHttpError(401, 'Wrong credentials');
  }
  const session = await createActiveSession(user._id);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + refreshTokenLifetime),
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + refreshTokenLifetime),
  });

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken: session.accessToken },
  });
};
