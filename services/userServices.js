import models from '../models';

export const saveUser = async (user) => {
  const userModel = new models.User({ username: user.username, createdAt: new Date() })
  const savedUser = await userModel.save();
  return savedUser;
}

export const getAllUsers = async (user) => {
  const User = models.User;
  const users = await User.find()
  return users
}