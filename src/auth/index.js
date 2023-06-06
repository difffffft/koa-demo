const { model } = require("mongoose");

/**
 * 用户认证
 * 判断用户被注销，判断用户是否被禁用
 */
const userUsable = async (ctx, next) => {
  console.log("认证通过");
  // 继续执行下一个中间件或路由处理程序
  await next();
};

module.exports = {
  userUsable,
};
