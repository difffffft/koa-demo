const { USER_LOGIN_MODEL } = require("../config");
const { USER_LOGIN_MODEL_S } = require("../constants");
const { User } = require("../model");

const userEmailInsert = async (ctx, next) => {
  // 1.验证邮箱格式是否相同

  // 2.验证是否有相同的邮箱
  const res = await User.findOne({ email: ctx.request.body.email });
  if (res) {
    throw new Error("用户已被注册");
  }

  // 3.把密码加密

  // 4.创建用户
  const res2 = await User.create({
    ...ctx.request.body,
  });

  //4.返回结果
  ctx.success(res2);
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
