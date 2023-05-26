const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  /**
   * 用户邮箱
   */
  email: {
    type: String,
    default: "",
  },
  /**
   * 用户密码
   */
  password: {
    type: String,
    default: "123456",
  },
  /**
   * 用户昵称
   */
  nickname: {
    type: String,
    default: "xxxx",
  },
  /**
   *
   */
  age: {
    type: Number,
    default: null,
  },
});
const User = mongoose.model("user", userSchema);

module.exports = { User };
