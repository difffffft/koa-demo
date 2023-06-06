const jwt = require("jsonwebtoken");
const {
  JWT_SECRET,
  JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
} = require("../config");

class Jwt {
  static accessToken(id) {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_ACCESS_EXPIRES_IN });
  }
  static refreshToken(id) {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });
  }
  static verify() {
    jwt.verify(token, JWT_SECRET);
  }
}

module.exports = { Jwt };
