const errorMiddleware = async (ctx, next) => {
  // 404错误
  if (ctx.status === 404 && !ctx.body) {
    ctx.error("接口不存在或已失效");
  }
  // 代码编写错误
  try {
    await next();
  } catch (err) {
    ctx.error(err.message);
  }
};

const corsMiddleware = async (ctx, next) => {
  // 设置允许的来源
  ctx.set("Access-Control-Allow-Origin", "*");
  // 设置允许的请求方法
  ctx.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  // 设置允许的请求头字段
  ctx.set(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  // 允许发送凭证（如cookies）
  ctx.set("Access-Control-Allow-Credentials", "true");
  // 设置预检请求的缓存时间（单位：秒）
  ctx.set("Access-Control-Max-Age", "3600");
  // 如果是预检请求（OPTIONS请求），则直接返回200
  if (ctx.method === "OPTIONS") {
    ctx.status = 200;
  } else {
    // 继续执行下一个中间件或路由处理程序
    await next();
  }
};

const unifiedResponseMiddleware = async (ctx, next) => {
  // 自定义success方法
  ctx.success = function (data, code = 200, message = "success") {
    if (data === undefined) {
      data = null;
    }
    ctx.status = code;
    ctx.body = {
      code,
      data,
      message,
    };
  };

  // 自定义error方法
  ctx.error = function (message, code = 500) {
    ctx.status = code;
    ctx.body = {
      code,
      message,
    };
  };

  await next();
};

module.exports = {
  errorMiddleware,
  corsMiddleware,
  unifiedResponseMiddleware,
};
