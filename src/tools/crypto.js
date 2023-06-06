const crypto = require("crypto");

// 生成16位的hash盐值
function generateSalt() {
  return crypto.randomBytes(16).toString("hex");
}

// 加密密码
const encryptPassword = (password, salt) => {
  const hash = crypto.createHmac("sha256", salt);
  hash.update(password);
  const encryptedPassword = hash.digest("hex");
  return encryptedPassword + salt;
};

// 校验密码
const decryptPassword = (inputPassword, storedPassword, salt) => {
  const encryptedPassword = encryptPassword(inputPassword, salt);
  return encryptedPassword === storedPassword;
};

module.exports = {
  generateSalt,
  encryptPassword,
  decryptPassword,
};
