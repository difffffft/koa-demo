const Router = require("koa-router");
const router = new Router();
const { userInsert, userLogin } = require("../../service/user.service");

router.prefix("/user");

/**
 * 预览界面
 */
router.get("/index", async (ctx) => {
  return ctx.render("index");
});

/**
 * 查询单个用户详细信息
 */
router.get("/:id", async (ctx, next) => {
  ctx.success(ctx.params);
});

/**
 * 查询所有用户
 */
router.get("/list", async (ctx, next) => {
  // const users = await collection.findOne({ name: "John Doe1" });
  // ctx.success(users);
  // const user = new User({});
  // const res = await user.save();
  // const res = await User.find();
  // ctx.success(res);
});

/**
 * 新增用户
 */
router.post("/", async (ctx, next) => {
  await userInsert(ctx, next);
});

/**
 * 登录
 */
router.post("/login", async (ctx, next) => {
  await userLogin(ctx, next);
});

/**
 * 修改用户
 */
router.put("/:id", async (ctx, next) => {
  ctx.success("修改用户");
});

/**
 * 删除用户
 */
router.delete("/:id", async (ctx, next) => {
  ctx.success(ctx.params);
});

/**
 * 上传文件
 * 支持单文件和多文件上传
 */
router.post("/upload", async (ctx, next) => {
  if (ctx.request.files && ctx.request.files.file) {
    if (ctx.request.files.file.length === 1) {
      const file = ctx.request.files.file;
      ctx.success({
        filename: file.newFilename,
        path: file.filepath,
      });
    } else {
      const res = [];
      ctx.request.files.file.forEach((item) => {
        res.push({
          filename: item.newFilename,
          path: item.filepath,
        });
      });
      ctx.success(res);
    }
  }
});

module.exports = router;
