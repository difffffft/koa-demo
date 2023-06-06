const Router = require("koa-router");
const { userUsable } = require("../auth");

const rootRouter = new Router();
rootRouter.prefix("/v1");

/**
 * 注册所有用户接口
 */
const userRouter = require("./v1/user.router");

/**
 * 用户认证
 */
rootRouter.use(userUsable);

/**
 * 用户鉴权
 */

/**
 * 访问路由
 */
rootRouter.use(userRouter.routes(), userRouter.allowedMethods());

module.exports = rootRouter;
