const jwt = require("jsonwebtoken");

exports.ensureHandleExists = authheader => {
  let decoded = jwt.verify(authheader, process.env.SECRET_KEY, { json: true });
  if (decoded.handle) {
    return [true, decoded.handle];
  }
  return [false, "401 Unauthorized, You are not authorized to make changes."];
};
