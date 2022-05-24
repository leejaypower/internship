const repository = require('../repository');
const auth = require('../middleware/auth');

const signIn = async (email, password) => {
  try {
    const adminInfo = await repository.admin.getByEmail(email);
    if (!adminInfo) {
      throw new Error('email does not exist');
    }
    if (adminInfo.password !== password) {
      throw new Error('wrong password');
    }
    const token = auth.jwt.issue({ email }, { expiresIn: '10 minute' });
    return token;
  } catch (err) {
    return err.message;
  }
};

module.exports = { signIn };
