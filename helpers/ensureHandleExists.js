const jwt = require('jsonwebtoken');

exports.ensureHandleExists = authheader => {
  let decoded = jwt.verify(authheader, process.env.SECRET_KEY, { json: true });
  console.log('WHAT jksja;fdsakf', decoded.company);
  if (decoded.company) {
    return [true, decoded.company];
  }
  return '401 Unauthorized, You are not authorized to make changes.';
};
