const {
  User, Auth, sequelize, Sequelize,
} = require('../database/models');
const { timer } = require('../utils');
const { QUERY, TABLE, BUSINESS } = require('../utils/constants');

const createUser = async (createData) => {
  const result = await sequelize.transaction(async (transaction) => {
    const {
      email,
      password,
      phone,
      name,
      role = TABLE.USER_ROLE.USER,
    } = createData;

    const user = await User.create({
      email,
      password,
      phone,
      name,
    }, {
      transaction,
    });

    const auth = await Auth.create({
      role,
      userId: user.id,
    }, {
      transaction,
    });

    user.password = undefined;
    user.dataValues.role = auth.role;
    return user;
  });
  return result;
};

const getUsers = async (getUsersQuery) => {
  const {
    page = BUSINESS.PAGE_DEFAULT,
    email,
    warningCount = 0,
    role,
    from,
    to,
    filter,
  } = getUsersQuery;

  const { Op } = Sequelize;

  const limit = BUSINESS.PER_PAGE;
  const offset = (page - 1) * limit;

  const where = {};
  const authWhere = {};
  const order = [['createdAt', 'DESC']];
  let paranoid = true;
  if (email) { where.email = { [Op.like]: `%${email}%` }; }
  if (warningCount !== undefined) {
    where.warningCount = { [Op.gte]: warningCount };
    order.push(['warningCount', 'DESC']);
  }
  if (role) { authWhere.role = { [Op.eq]: role }; }
  where.createdAt = { [Op.gte]: timer.beforeNDate(30) };
  if (from && to) {
    where.createdAt = { [Op.between]: [timer.stringToDate(from), timer.stringToDate(to)] };
  } else if (from) {
    where.createdAt = { [Op.gte]: timer.stringToDate(from) };
  } else if (to) {
    where.createdAt = { [Op.lte]: timer.stringToDate(to) };
  }
  if (filter === QUERY.FILTER.ALL) {
    paranoid = false;
  } else if (filter === QUERY.FILTER.DELETED) {
    paranoid = false;
    where.deletedAt = { [Op.not]: null };
  }

  const users = await User.findAll({
    where,
    limit,
    offset,
    attributes: { exclude: ['password'] },
    paranoid,
    include: {
      model: Auth,
      attributes: ['role', 'updatedAt'],
      where: authWhere,
    },
    order,
  });
  return users;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
    include: {
      model: Auth,
      attributes: ['role', 'updatedAt'],
    },
  });
  return user;
};

const getUser = async (getBy, selectPassword = false) => {
  const user = await User.findOne({
    where: getBy,
    attributes: { exclude: [selectPassword ? '' : 'password'] },
    include: {
      model: Auth,
      attributes: ['role', 'updatedAt'],
    },
  });
  return user;
};

const updateUser = async (updateBy, updateData) => {
  const {
    password,
    phone,
    name,
  } = updateData;

  const result = await User.update({
    password,
    phone,
    name,
  }, {
    where: updateBy,
  });
  return result;
};

const updateUserByAdmin = async (id, updateData) => {
  const result = await sequelize.transaction(async (transaction) => {
    const {
      password,
      phone,
      name,
      warningCount,
      rentalCount,
      role,
      refreshToken,
    } = updateData;

    const updateResult = await User.update({
      password,
      phone,
      name,
      warningCount,
      rentalCount,
    }, {
      where: { id },
      transaction,
    });
    await Auth.update({
      role,
      refreshToken,
    }, {
      where: { userId: id },
      transaction,
    });
    return updateResult;
  });
  return result;
};

const deleteUser = async (deleteBy) => {
  const result = await User.destroy({
    where: deleteBy,
  });
  return result;
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  getUser,
  updateUser,
  updateUserByAdmin,
  deleteUser,
};
