const { UserInputError } = require('apollo-server-koa');
const { commonUtils, authUtils } = require('../../../libs');
const service = require('../../../services');

const userResolver = {
  LoginResponse: {
    // eslint-disable-next-line no-underscore-dangle
    __resolveType(obj) {
      if (obj.accessToken) {
        return 'LoginSuccess';
      }
      if (obj.message) {
        return 'message';
      }
      return null;
    },
  },

  Query: {
    currentUser: (parent, args, context) => context.user,

    /**
 * Get user list and cursor based pagination
 * @param { { first = 5, after }} param
 * @returns
 */
    getAllUser: async (parent, { first = 5, after }, _context) => {
      const { rows, count } = await service.graphql.user.getAllUser({ first, after });

      // cursor 방식 통일, 모듈화 진행할 것
      const endCursor = rows?.length
        ? commonUtils.encodeCursor(rows[rows.length - 1].createdAt.toString())
        : null;

      const hasNextPage = rows?.length ? count > rows.length : false;

      return {
        edges: rows,
        pageInfo: { endCursor, hasNextPage },
      };
    },
  },

  Mutation: {
    signIn: async (parent, { input }, _context) => {
      if (!input.email || !input.password) {
        throw new UserInputError('wrong user email or password ');
      }
      const data = await service.graphql.user.signIn({ input });
      return data;
    },

    signOut: async (parent, { input }, context) => {
      const userId = context.code === 'ADMIN' ? input : context.user.id;

      await service.user.signOut(userId);

      return { message: 'log out successfully' };
    },

    createUser: async (parent, { input }, _context) => {
      const { name, email, role: groupName } = input;

      if (!name || !email || !input.password) {
        throw new UserInputError('wrong user input');
      }

      const password = await authUtils.hashFunc(input.password);

      await service.user.createUser({
        name, email, groupName, password,
      });

      return { message: 'created successfully' };
    },

    updateUser: async (parent, { input }, context) => {
      const newInput = { ...input };
      const userId = context.user.id;

      // 수정 할 인자로 password가 있다면 추가
      if (input?.password) {
        newInput.password = await authUtils.hashFunc(input.password);
      }

      await service.user.updateUser(userId, newInput);

      return { message: 'Updated successfully' };
    },

    deleteUser: async (parent, _args, context) => {
      const { id: userId } = context.user;

      await service.user.deleteUser(userId);
      return { message: 'Delete successfully' };
    },
  },
};
module.exports = userResolver;
