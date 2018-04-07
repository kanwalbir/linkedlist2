const jwt = require("jsonwebtoken");
const SECRET = "HACK REACTOR";

function ensureCorrectUser(authHeader, correctUser) {
  const token = authHeader.split(" ")[1];

  if (token) {
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        return res.json({ message: "Invalid Token" });
      } else {
        req.decoded = decoded;
        return next();
      }
    });
  } else {
    return res.status(401).json({ message: "No token provided." });
  }
}

module.exports = ensureCorrectUser;
