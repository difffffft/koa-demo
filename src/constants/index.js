const USER_LOGIN_MODEL_S = {
  EMAIL: "email",
  PHONE: "phone",
};

const USER_REGISTER_MODEL_S = {
  EMAIL: "email",
  PHONE: "phone",
};

const MONGODB_DB = "mydatabase";
const MONGODB_URL = `mongodb://127.0.0.1:27017/${MONGODB_DB}`;

module.exports = { MONGODB_URL, USER_LOGIN_MODEL_S, USER_REGISTER_MODEL_S };
