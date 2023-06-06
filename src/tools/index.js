function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validatePhoneNumber(phoneNumber) {
  const regex = /^1[0-9]{10}$/;
  return regex.test(phoneNumber);
}

module.exports = {
  validateEmail,
  validatePhoneNumber,
};
