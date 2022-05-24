const repository = require('../repository');
const auth = require('../middleware/auth');

const createUser = async (userData) => {
  try {
    const { name, email, password } = userData;
    if (!name) { throw new Error('name does not exist'); }
    if (!email) { throw new Error('email does not exist'); }
    if (!password) { throw new Error('password does not exist'); }
    const emailCheck = await repository.user.getByEmail(userData.email);
    if (emailCheck) { throw new Error('email already exist'); }
    const hashedPassword = await auth.hash.hashPassword(password);
    const newUserData = await repository.user.createUser({ name, email, password: hashedPassword });
    newUserData.password = undefined;
    return newUserData;
  } catch (err) {
    return err.message;
  }
};

const getListAll = async () => {
  try {
    const userList = await repository.user.getListAll();
    return userList;
  } catch (err) {
    return err.message;
  }
};

const signIn = async (email, password) => {
  try {
    const matchedUser = await repository.user.getByEmail(email);
    if (matchedUser.email !== email) {
      throw new Error('email does not exist');
    } else {
      const matchPassword = await auth.hash.comparePassword(password, matchedUser.password);
      if (!matchPassword) {
        throw new Error('wrong password');
      } else {
        const token = auth.jwt.issue({ email }, { expiresIn: '10 minute' });
        return token;
      }
    }
  } catch (err) {
    return err.message;
  }
};

module.exports = { createUser, getListAll, signIn };
