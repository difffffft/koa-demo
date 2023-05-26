const Router = require("koa-router");
const rootRouter = new Router();
rootRouter.prefix("/v1");

/**
 * 注册所有用户接口
 */
const userRouter = require("./v1/user.router");
rootRouter.use(userRouter.routes(), userRouter.allowedMethods());

module.exports = rootRouter;
