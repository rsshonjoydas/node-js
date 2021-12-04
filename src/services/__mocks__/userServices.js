import models from "../../models";

let users = [{
  '_id': '1', 'username': 'Shonjoy'
}]

export const getAllUsers = async (user) => {
  return users
}

export const saveUser = async (user) => {
  const userModel = new models.User(user);
  users.push(userModel)
  return userModel;
}

export const getUserById = async (id) => {
  let model = users.find(user => user.id === id)
  return model;
}
