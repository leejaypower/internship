// Repository 역할
// DB와 데이터 통신

// return undefined => error 핸들링 관련 주차에 정리 예정

const { userDao, common, authDao } = require('../daos');

const getUsers = async (query) => {
  try {
    const {
      page = 1,
      email,
      warningCount = 0,
    } = query;

    const Op = common.getOperator();

    const limit = process.env.PER_PAGE;
    const offset = (page - 1) * limit;

    const where = {};
    if (email !== undefined) { where.email = { [Op.like]: `%${email}%` }; }
    if (warningCount !== undefined) { where.warningCount = { [Op.gte]: warningCount }; }

    const users = await userDao.findAll({
      where,
      limit,
      offset,
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC'], ['warningCount', 'DESC']],
    });
    return users;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getUser = async (id) => {
  try {
    const user = await userDao.findById(id, {});
    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const createUser = async (createUserData) => {
  const transaction = await common.getTransaction();
  try {
    const {
      email,
      password,
      phone,
      name,
    } = createUserData;

    const [user, created] = await userDao.findOrCreate({
      where: { email },
      defaults: {
        email,
        password,
        phone,
        name,
      },
      attributes: { exclude: ['password'] },
      transaction,
    });
    if (!created) {
      throw Error('User already exist');
    }

    await authDao.create({
      role: 'user',
      userId: user.id,
    }, {
      transaction,
    });

    await transaction.commit();
    return user;
  } catch (error) {
    await transaction.rollback();
    return error.message;
  }
};

const updateUser = async (id, updateUserData) => {
  try {
    await userDao.update(updateUserData, {
      where: { id },
    });
    return await userDao.findById(id, {});
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteUser = async (id) => {
  try {
    const result = await userDao.destroy({
      where: { id },
    });
    return result === 1 ? 'User delete done' : 'User delete fail';
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
