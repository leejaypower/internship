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
      try {
        const { rows, count } = await service.gql.user.getAllUser({ first, after });

        // cursor 방식 통일, 모듈화 진행할 것
        const endCursor = rows?.length
          ? commonUtils.encodeCursor(rows[rows.length - 1].createdAt.toString())
          : null;

        const hasNextPage = rows?.length ? count > rows.length : false;

        return {
          edges: rows,
          pageInfo: { endCursor, hasNextPage },
        };
      } catch (err) {
        throw Error(err);
      }
    },
  },

  Mutation: {
    signIn: async (parent, { input }, _context) => {
      try {
        if (!input.email || !input.password) {
          throw new UserInputError('wrong user email or password ');
        }

        const data = await service.gql.user.signIn({ input });
        return data;
      } catch (err) {
        throw Error(err);
      }
    },

    signOut: async (parent, { input }, context) => {
      try {
        const userId = context.code === 'ADMIN' ? input : context.user.id;

        await service.user.signOut(userId);

        return { message: 'log out successfully' };
      } catch (err) {
        throw Error(err);
      }
    },

    createUser: async (parent, { input }, _context) => {
      try {
        const { name, email, role: groupName } = input;

        if (!name || !email || !input.password) {
          throw new UserInputError('wrong user input');
        }

        const password = await authUtils.hashFunc(input.password);

        await service.user.createUser({
          name, email, groupName, password,
        });

        return { message: 'created successfully' };
      } catch (err) {
        throw Error(err);
      }
    },

    updateUser: async (parent, { input }, context) => {
      try {
        const newInput = { ...input };
        const userId = context.user.id;

        // 수정 할 인자로 password가 있다면 추가
        if (input?.password) {
          newInput.password = await authUtils.hashFunc(input.password);
        }

        await service.user.updateUser(userId, newInput);

        return { message: 'Updated successfully' };
      } catch (err) {
        throw Error(err);
      }
    },

    deleteUser: async (parent, _args, context) => {
      const { id: userId } = context.user;
      try {
        await service.user.deleteUser(userId);
        return { message: 'Delete successfully' };
      } catch (err) {
        throw Error(err);
      }
    },
  },
};
module.exports = userResolver;
