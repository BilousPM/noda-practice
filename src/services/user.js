import {
  accessTokenLifetime,
  refreshTokenLifetime,
} from '../constants/constants.js';
import { SessionCollection } from '../db/models/Session.js';
import { UserCollection } from '../db/models/User.js';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

export const findUserByEmail = (email) =>
  UserCollection.findOne({
    email,
  });

export const findUserById = (userId) => UserCollection.findById(userId);

export const findSessionByToken = (token) =>
  SessionCollection.findOne({ accessToken: token });

export const createUser = async (userData) => {
  const password = await bcrypt.hash(userData.password, 10);

  return UserCollection.create({
    ...userData,
    password,
  });
};

export const createActiveSession = async (userId) => {
  await SessionCollection.deleteOne({ userId });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  const accessTokenValidUntil = Date.now() + accessTokenLifetime;
  const refreshTokenValidUntil = Date.now() + refreshTokenLifetime;

  return SessionCollection.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });
};
