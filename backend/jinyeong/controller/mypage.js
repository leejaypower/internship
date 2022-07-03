const { mypageService } = require('../services');
const { util, constants } = require('../common');
const { restApiResponse } = require('./response');

const { errorHandler } = util;
const { ERROR_CODE } = constants;

// 유효성 검사 정규표현식
const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

const getMypage = async (ctx) => {
  const userId = ctx.tokenId;

  if (!uuidRegex.test(userId)) {
    throw new errorHandler.CustomError(ERROR_CODE.INVALID_INPUT_TYPE);
  }

  const result = await mypageService.getMypage(userId);

  ctx.body = restApiResponse(200, result);
};

const deleteMyAccount = async (ctx) => {
  const userId = ctx.tokenId;

  if (!uuidRegex.test(userId)) {
    throw new errorHandler.CustomError(ERROR_CODE.INVALID_INPUT_TYPE);
  }

  await mypageService.deleteMyAccount(userId);
  ctx.status = 204;
};

module.exports = {
  getMypage,
  deleteMyAccount,
};
