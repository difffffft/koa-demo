const { USER_REGISTER_LOGIN_MODELS } = require("../constants");

/**
 * 注册登录模式
 * 使用邮箱还是手机号登录
 */
const USER_REGISTER_LOGIN_MODEL = USER_REGISTER_LOGIN_MODELS.PHONE;

/**
 * JWT颁发签证
 */
const JWT_SECRET = "xxx.com";

/**
 * JWT失效时间
 * 默认两小时
 */
const JWT_ACCESS_EXPIRES_IN = "2h";

/**
 * 长时间刷新Token
 * 默认是它的两倍
 */
const JWT_REFRESH_EXPIRES_IN = "4h";

/**
 * 导出
 */
module.exports = {
  USER_REGISTER_LOGIN_MODEL,
  JWT_SECRET,
  JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
};
