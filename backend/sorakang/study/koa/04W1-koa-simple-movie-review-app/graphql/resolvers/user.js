// register , login mutation

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { AuthenticationError, UserInputError } = require('apollo-server-koa');
const { User } = require('../../db/models');
require('dotenv').config();

module.exports = {
  RegisterResponse: {
    // eslint-disable-next-line no-underscore-dangle
    __resolveType(obj) {
      if (obj.id) {
        return 'RegisterSuccess';
      }
      if (obj.message) {
        return 'message';
      }
      return null;
    },
  },
  Mutation: {
    async register(root, args) {
      const { userName, email, password } = args.input;
      const salt = await bcrypt.genSalt(10);

      const [uesrInfo, created] = await User.findOrCreate({
        where: { userName, email },
        defaults: { password, salt },
      });

      if (!created) return { message: 'ID or email already exists' };
      return {
        id: uesrInfo.dataValues.id,
        userName: uesrInfo.dataValues.userName,
        email: uesrInfo.dataValues.email,
      };
    },

    async login(root, args) {
      // email check , password validation 필요
      const { email, password } = args.input;

      const user = await User.findOne({ where: { email } });
      // if can't find user
      if (!user) {
        throw new UserInputError('User does not exist');
      }

      if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id: user.id }, process.env.PASSWORD_SECRETE);
        return { ...user.toJSON(), token };
      }
      throw new AuthenticationError('Invalid credentials');
    },

    async removeUser(root, { userId }) {
      return User.destroy({ where: { id: userId } }).then((res) => {
        if (res === 0) return { message: 'User user does not exist' };
        return { message: 'Successfully deleted' };
        // graphQL
      });
    },
  },
};

// https://github.com/apollographql/apollo-server/blob/main/packages/apollo-server-errors/src/index.ts
