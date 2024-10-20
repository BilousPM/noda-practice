import { UserCollection } from '../db/models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';

export const findUserByEmail = (email) =>
  UserCollection.findOne({
    email,
  });

export const findUserById = (userId) => UserCollection.findById(userId);

// export const findSessionByToken = (token) =>
//   SessionCollection.findOne({ accessToken: token });

export const updateUserWithToken = async (userId) => {
  const userToken = jwt.sign({ id: userId }, env('JWT_SECRET'), {
    expiresIn: '30d',
  });

  return UserCollection.findByIdAndUpdate(
    userId,
    {
      token: userToken,
    },
    { new: true },
  );
};

export const createUser = async (userData) => {
  const password = await bcrypt.hash(userData.password, 10);

  const user = await UserCollection.create({
    ...userData,
    password,
  });
  return updateUserWithToken(user._id);
};

export const logoutUser = async (userId) => {
  UserCollection.findByIdAndUpdate(userId, { token: '' });
};

// export const createActiveSession = async (userId) => {
//   await SessionCollection.deleteOne({ userId });

//   const accessToken = randomBytes(30).toString('base64');
//   const refreshToken = randomBytes(30).toString('base64');

//   const accessTokenValidUntil = Date.now() + accessTokenLifetime;
//   const refreshTokenValidUntil = Date.now() + refreshTokenLifetime;

//   return SessionCollection.create({
//     userId,
//     accessToken,
//     refreshToken,
//     accessTokenValidUntil,
//     refreshTokenValidUntil,
//   });
// };
