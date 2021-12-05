import UserDataModel from '../models/data-models';
import UserViewModel from '../models/view-models';
import { NotFound } from '../utils/error';

export const getAllUsers = async () => {
  const User = UserDataModel.User;
  const users = await User.find()
  let allUsers = users.map(user => new UserViewModel(user))
  return allUsers
}

export const getUserById = async (id) => {
  const User = UserDataModel.User;
  let model = await User.findById(id);
  let viewModel = new UserViewModel(model)
  return viewModel;
}

export const saveUser = async (user) => {
  const userModel = new UserDataModel.User(user);
  const savedUser = await userModel.save();
  return savedUser._id;
}

export const updateUser = async (user) => {
  const id = user.id;
  const User = UserDataModel.User;
  let model = await User.findById(id)
  if (model) {
    model.username = user.username;
    model.save()
    return model._id;
  }
  throw new NotFound('User not found')
}

export const deleteUser = async (id) => {
  const User = UserDataModel.User;
  let model = await User.findById(id)
  if (model) {
    let result = await User.deleteOne({ _id: id });
    return result;
  }
  throw new NotFound('User not found')
}