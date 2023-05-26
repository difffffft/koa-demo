const { USER_LOGIN_MODEL_S, USER_REGISTER_MODEL_S } = require("../constants");

/**
 * 登录模式
 * 使用邮箱登录，还是手机号登录
 */
const USER_LOGIN_MODEL = USER_LOGIN_MODEL_S.EMAIL;

/**
 * 注册模式
 * 使用邮箱注册，还是手机号注册
 */
const USER_REGISTER_MODEL = USER_REGISTER_MODEL_S.EMAIL;

/**
 * 导出
 */
module.exports = { USER_LOGIN_MODEL, USER_REGISTER_MODEL };
