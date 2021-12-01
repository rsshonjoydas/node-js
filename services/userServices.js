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

export const updateUser = async (user) => {
  const id = user._id;
  const User = models.User;
  let model = await User.findById(id)
  if (model) {
    model.username = user.username;
    model.save()
    return model;
  }
  return null;
}

export const deleteUser = async (id) => {
  const User = models.User;
  let model = await User.findById(id)
  if (model) {
    let result = await User.deleteOne({ _id: id });
  return result;
  }
  return new Error('User not found')
}