const jwt = require("jsonwebtoken");

exports.ensureCorrectCompany = (authHeader, correctCompanyHandle) => {
  let decoded = jwt.verify(authHeader, process.env.SECRET_KEY, { json: true })
    .handle;
  if (decoded === correctCompanyHandle) {
    return "OK";
  }
  return "401 Unauthorized, You are not authorized to make changes.";
};
