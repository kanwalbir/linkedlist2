const jwt = require("jsonwebtoken");

exports.ensureCorrectUser = (authHeader, max) => {
  console.log("inside the function correct user");
  // const queryToken = req.query.token;
  const headerToken = authHeader;
  console.log("I need take a shit ", headerToken);
  const token = headerToken;
  console.log("this is a damn token ", token);
  let correctUser = max;
  try {
    let username = jwt.verify(token, { json: true }).username;
    console.log("this is the fuckin ", username);
  } catch (e) {
    return e;
  }
  if (username !== correctUser) {
    return "401 Unauthorized, You are not authorized to make changes.";
  }
  return "OK";
};
