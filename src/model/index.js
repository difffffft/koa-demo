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
   * 用户手机号
   */
  phone: {
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
   * 年龄
   */
  age: {
    type: Number,
    default: null,
  },

  /**
   * 是否被禁用
   */
  disable: {
    type: Boolean,
    default: false,
  },
});
const User = mongoose.model("user", userSchema);

module.exports = { User };
