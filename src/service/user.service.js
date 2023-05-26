const { USER_LOGIN_MODEL } = require("../config");
const { USER_LOGIN_MODEL_S } = require("../constants");
const { User } = require("../model");

const userEmailInsert = async (ctx, next) => {
  // 1.验证是否有相同的邮箱
  const res = User.find({ email: ctx.request.body.email });
  ctx.success(res);
};

const userPhoneInsert = async (ctx, next) => {};

const userInsert = async (ctx, next) => {
  if (USER_LOGIN_MODEL === USER_LOGIN_MODEL_S.EMAIL) {
    await userEmailInsert(ctx, next);
    return;
  }
  if (USER_LOGIN_MODEL === USER_LOGIN_MODEL_S.PHONE) {
    await userPhoneInsert(ctx, next);
    return;
  }
};

module.exports = { userInsert };
