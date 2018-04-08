const jwt = require('jsonwebtoken');

exports.ensureCorrectCompany = (authHeader, correctCompany) => {
  let decoded = jwt.verify(authHeader, process.env.SECRET_KEY, { json: true })
    .handle;
  if (decoded === correctCompany) {
    return 'OK';
  }
  return '401 Unauthorized, You are not authorized to make changes.';
};

// CRAP
// try {
//   let decoded = jwt.verify(authHeader, SECRET, { json: true }).username;
//   console.log(authHeader);
//   console.log(decoded, "/////////////");
//   console.log("*****************", decoded);
// } catch (e) {
//   console.log("THIS IS A CATCH ????????");
//   return e;
// }
// if (decoded !== correctUser) {
//   console.log("THIS IS AN ERROR ////////////");
//   return "401 Unauthorized, You are not authorized to make changes.";
// }
// console.log("THIS IS WHAT SUCCESS LOOKS LIKE???");
// return "OK";
