const { Op } = require('sequelize');
const { User } = require('../../database/models');

const getUser = async (limit, cursor, name, email, phone) => {
  try {
    const userList = await User.findAll({
      limit,
      attributes: { exclude: ['password'] },
      where: {
        id: { [Op.gte]: cursor },
        [Op.and]: [
          { name: { [Op.like]: `%${name}%` } },
          { email: { [Op.like]: `%${email}%` } },
          { phone: { [Op.like]: `%${phone}%` } },
        ],
      },
    });
    if (!userList.length || !userList) {
      throw new Error(404, 'Data not Found');
    }
    return { userList };
  } catch (err) {
    throw new Error(err); // 임시 error handling
  }
};

const getSingleUser = async (userId) => {
  try {
    const user = await User.findByPk(userId, {
      attributes: {
        exclude: ['password'],
      },
    });
    if (!user) {
      throw new Error(404, 'Data not Found');
    }
    return { user };
  } catch (err) {
    throw new Error(err); // 임시 error handling
  }
};

const createUser = async (userInfo) => {
  const {
    password, name, email, phone, groupName,
  } = userInfo;

  try {
    const [_, isCreated] = await User.findOrCreate({
      attributes: {
        exclude: ['password'],
      },
      where: {
        email: userInfo.email,
      },
      defaults: {
        password, name, email, phone, groupName,
      },
    });

    return { isCreated };
  } catch (err) {
    throw new Error(err); // 임시 error handling
  }
};

const updateUser = async (userId, userInfo) => {
  try {
    const user = await User.findByPk(userId).then((result) => result.dataValues);

    if (!user) {
      throw new Error('User does not exist ');
    }

    const isUpdated = await User.update({ ...userInfo }, { where: { id: userId } });
    return { isUpdated };
  } catch (err) {
    throw new Error(err); // 임시 error handling
  }
};

const deleteUser = async (userId) => {
  const isDeleted = await User.destroy({ where: { id: userId } });
  return { isDeleted };
};

const findByEmail = async (email) => {
  const user = await User.findOne({
    where: { email },
  });

  return { user };
};

const findAndCountAll = async (limit, whereOptions, order) => {
  const { rows, count } = await User.findAndCountAll({
    order,
    limit,
    where: whereOptions,
  });

  return { rows, count };
};

module.exports = {
  getUser, getSingleUser, createUser, updateUser, deleteUser, findByEmail, findAndCountAll,
};
