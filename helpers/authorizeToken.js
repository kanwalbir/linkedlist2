const jwt = require("jsonwebtoken");
const SECRET = "HACK REACTOR";

exports.authorizeToken = (req, res, next) => {
  const queryToken = req.query.token;
  console.log("queryToken", queryToken);

  console.log("headers", req.headers);
  const headerToken = req.headers.authorization;
  //req.headers.authorization && req.headers.authorization.split(" ")[1];
  // console.log("headerToken", headerToken);

  const token = queryToken || headerToken;
  console.log("this is a goddamn token ", token);

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
};
