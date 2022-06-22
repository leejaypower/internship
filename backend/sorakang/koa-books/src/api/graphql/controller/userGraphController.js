const { UserInputError } = require('apollo-server-koa');
const { userService } = require('../../../services');
const { userGraphService } = require('../service');
const { commonUtils, authUtils } = require('../../../utils');

const getAllUser = async (parent, { first, after }, context) => {
  try {
    const { rows, count } = await userGraphService.getAllUser({ first, after });

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
};

const signIn = async (parent, { input }, context) => {
  try {
    if (!input.email || !input.password) {
      throw new UserInputError('wrong user email or password ');
    }

    const data = await userGraphService.signIn({ input });

    return data;
  } catch (err) {
    throw Error(err);
  }
};

const signOut = async (parent, { input }, context) => {
  try {
    // Admin은 모든 사용자 로그아웃 가능..

    const userId = context.code === 'ADMIN' ? input : context.user.id;

    await userService.signOut(userId);

    return { message: 'log out successfully' };
  } catch (err) {
    throw Error(err);
  }
};

const createUser = async (parent, { input }, context) => {
  try {
    const { name, email, role: groupName } = input;

    if (!name || !email || !input.password) {
      throw new UserInputError('wrong user input');
    }

    const password = await authUtils.hashFunc(input.password);

    await userService.createUser({
      name, email, groupName, password,
    });

    return { message: 'created successfully' };
  } catch (err) {
    throw Error(err);
  }
};

const updateUser = async (parent, { input }, context) => {
  try {
    const newInput = { ...input };
    const userId = context.user.id;

    // 수정 할 인자로 password가 있다면 추가
    if (input?.password) {
      newInput.password = await authUtils.hashFunc(input.password);
    }

    await userService.updateUser(userId, newInput);

    return { message: 'Updated successfully' };
  } catch (err) {
    throw Error(err);
  }
};

const deleteUser = async (parent, context) => {
  const { id: userId } = context.user;
  try {
    await userService.deleteUser(userId);

    return { message: 'Delete successfully' };
  } catch (err) {
    throw Error(err);
  }
};

module.exports = {
  signIn, signOut, createUser, updateUser, deleteUser, getAllUser,
};
