const jwt = require('jsonwebtoken');

exports.ensureUserExists = authheader => {
  let decoded = jwt.verify(authHeader, process.env.SECRET_KEY, { json: true });
  if (decoded.username) {
    return 'OK';
  }
  return '401 Unauthorized, You are not authorized to make changes.';
};
