import createHttpError from 'http-errors';
import {
  findUserByEmail,
  createUser,
  updateUserWithToken,
  findUserById,
  logoutUser,
} from '../services/user.js';
import bcrypt from 'bcrypt';

export const registerUserController = async (req, res) => {
  const { email, name } = req.body;

  const user = await findUserByEmail(email);
  if (user) throw createHttpError(409, 'Email in use');
  const { token } = await createUser(req.body);
  res.status(201).json({
    token,
    user: { name, email },
  });
};

export const loginUserController = async (req, res) => {
  const user = await findUserByEmail(req.body.email);
  const { name, email } = user;
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

  const { token } = await updateUserWithToken(user._id);
  res.status(200).json({
    token,
    user: { name, email },
  });
};

export const logoutController = async (req, res) => {
  const userId = req.user.id;
  await logoutUser(userId);

  res.sendStatus(204);
};

export const refreshUser = (req, res) => {
  const { name, email } = req.user;
  res.json({
    name,
    email,
  });
};
