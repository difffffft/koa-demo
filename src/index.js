const Koa = require("koa");
const static = require("koa-static");
const path = require("path");
const mount = require("koa-mount");
const { koaBody } = require("koa-body");
const views = require("koa-views");
const socket = require("socket.io");
const {
  errorMiddleware,
  corsMiddleware,
  unifiedResponseMiddleware,
} = require("./middleware");
const connectDB = require("./db");

const app = new Koa();

/**统一返回规范 */
app.use(unifiedResponseMiddleware);
/**全局异常捕获(放在所有中间件的第一个) */
app.use(errorMiddleware);
/**跨域 */
app.use(corsMiddleware);

/**文件上传 */
app.use(
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, "/static"),
      keepExtensions: true,
    },
  })
);

/**模板文件 */
app.use(views(path.join(__dirname, "/static"), { extension: "html" }));

/**注册路由 */
const router = require("./router");
app.use(router.routes(), router.allowedMethods());

/**静态资源 */
app.use(mount("/static", static(path.join(__dirname + "/static"))));

/**连接数据库 */
connectDB();

/**服务启动 */
const server = app.listen(3000, (a) => {
  console.log("server run http://localhost:3000");
});

/**sokect.io即时通讯 */
const io = socket(server, { cors: true });
io.on("connection", (socket) => {
  console.log("有人上线了...");
});
