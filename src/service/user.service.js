const { USER_REGISTER_LOGIN_MODEL } = require("../config");
const { USER_REGISTER_LOGIN_MODELS } = require("../constants");
const { User } = require("../model");
const { validateEmail, validatePhoneNumber } = require("../tools");
const {
  generateSalt,
  encryptPassword,
  decryptPassword,
} = require("../tools/crypto");
const { Jwt } = require("../tools/jwt");

const userInsert = async (ctx, next) => {
  const email = ctx.request.body.username;
  const phone = ctx.request.body.username;
  const password = ctx.request.body.password;
  if (USER_REGISTER_LOGIN_MODEL === USER_REGISTER_LOGIN_MODELS.EMAIL) {
    if (email === undefined) {
      throw new Error("请输入邮箱");
    }
  }
  if (USER_REGISTER_LOGIN_MODEL === USER_REGISTER_LOGIN_MODELS.PHONE) {
    if (phone === undefined) {
      throw new Error("请输入手机号");
    }
  }
  if (password === undefined) {
    throw new Error("请输入密码");
  }
  // 1.验证格式
  if (USER_REGISTER_LOGIN_MODEL === USER_REGISTER_LOGIN_MODELS.EMAIL) {
    if (!validateEmail(email)) {
      throw new Error("邮箱格式错误");
    }
  }
  if (USER_REGISTER_LOGIN_MODEL === USER_REGISTER_LOGIN_MODELS.PHONE) {
    if (!validatePhoneNumber(phone)) {
      throw new Error("手机号格式错误");
    }
  }

  // 2.验证是否有相同的邮箱
  let res = null;
  if (USER_REGISTER_LOGIN_MODEL === USER_REGISTER_LOGIN_MODELS.EMAIL) {
    res = await User.findOne({ email });
  }
  if (USER_REGISTER_LOGIN_MODEL === USER_REGISTER_LOGIN_MODELS.PHONE) {
    res = await User.findOne({ phone });
  }
  if (res) {
    throw new Error("用户已被注册");
  }
  // 3.把密码加密
  let pwd = encryptPassword(password, generateSalt());
  // 4.创建用户
  await User.create({
    ...ctx.request.body,
    email:
      USER_REGISTER_LOGIN_MODEL === USER_REGISTER_LOGIN_MODELS.EMAIL
        ? email
        : "",
    phone:
      USER_REGISTER_LOGIN_MODEL === USER_REGISTER_LOGIN_MODELS.PHONE
        ? phone
        : "",
    password: pwd,
  });
  //4.返回结果
  ctx.success("用户注册成功");
};

const userLogin = async (ctx, next) => {
  const email =
    USER_REGISTER_LOGIN_MODEL === USER_REGISTER_LOGIN_MODELS.EMAIL
      ? ctx.request.body.username
      : "";
  const phone =
    USER_REGISTER_LOGIN_MODEL === USER_REGISTER_LOGIN_MODELS.PHONE
      ? ctx.request.body.username
      : "";
  const inputPassword = ctx.request.body.password;
  if (USER_REGISTER_LOGIN_MODEL === USER_REGISTER_LOGIN_MODELS.EMAIL) {
    if (email === undefined) {
      throw new Error("请输入邮箱");
    }
  }
  if (USER_REGISTER_LOGIN_MODEL === USER_REGISTER_LOGIN_MODELS.PHONE) {
    if (phone === undefined) {
      throw new Error("请输入手机号");
    }
  }
  if (inputPassword === undefined) {
    throw new Error("请输入密码");
  }
  // 1.验证格式
  if (USER_REGISTER_LOGIN_MODEL === USER_REGISTER_LOGIN_MODELS.EMAIL) {
    if (!validateEmail(email)) {
      throw new Error("邮箱格式错误");
    }
  }
  if (USER_REGISTER_LOGIN_MODEL === USER_REGISTER_LOGIN_MODELS.PHONE) {
    if (!validatePhoneNumber(phone)) {
      throw new Error("手机号格式错误");
    }
  }
  //1.校验用户是否存在
  let res = null;
  if (USER_REGISTER_LOGIN_MODEL === USER_REGISTER_LOGIN_MODELS.EMAIL) {
    res = await User.findOne({ email });
  }
  if (USER_REGISTER_LOGIN_MODEL === USER_REGISTER_LOGIN_MODELS.PHONE) {
    res = await User.findOne({ phone });
  }
  if (res) {
    //2.校验用户是否被禁用
    if (res.disable) {
      throw new Error("用户已被封禁");
    } else {
      //3.校验账号密码是否匹配
      let storedPassword = res.password;
      let salt = storedPassword.slice(-32);
      if (decryptPassword(inputPassword, storedPassword, salt)) {
        // 将ID信息存入jwt中,返回给前端
        ctx.success({
          accessToken: Jwt.accessToken(res.id),
          refreshToken: Jwt.refreshToken(res.id),
        });
      } else {
        throw new Error("密码错误");
      }
    }
  } else {
    throw new Error("用户不存在");
  }
};

module.exports = { userInsert, userLogin };
