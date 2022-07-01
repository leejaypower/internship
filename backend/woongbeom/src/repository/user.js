const { Op } = require('sequelize');
const db = require('../db/models');
const { hash } = require('../lib/auth');

const createUser = async (userInstance) => {
  const {
    name, email, password,
  } = userInstance;
  const hashedPassword = await hash.hashPassword(password);
  const newUser = await db.User.create({
    name,
    email,
    password: hashedPassword,
  });
  return newUser;
};

const getUsers = async (userQuery) => {
  const {
    name,
  } = userQuery;

  const where = {};
  if (name) { where.name = { [Op.like]: `%${name}%` }; }
  const userList = await db.User.findAll({
    where,
    order: [['id', 'ASC']],
  });
  return userList;
};

const getUserById = async (id) => {
  const user = await db.User.findByPk(id);
  return user;
};

const getUserByEmail = async (email) => {
  const user = await db.User.findOne({
    where: {
      email,
    },
  });
  return user;
};

const updateUserName = async (id, data) => {
  const {
    name,
  } = data;
  const numOfUpdatedRow = await db.User.update({
    name,
  }, {
    where: { id },
  });
  return numOfUpdatedRow;
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  getUserByEmail,
  updateUserName,
};
