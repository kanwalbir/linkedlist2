const jwt = require("jsonwebtoken");

exports.ensureCorrectUser = (authHeader, correctUser) => {
  let decoded = jwt.verify(authHeader, process.env.SECRET_KEY, { json: true })
    .username;
  if (decoded === correctUser) {
    return "OK";
  }
  return "401 Unauthorized, You are not authorized to make changes.";
};
