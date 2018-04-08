const jwt = require('jsonwebtoken');

exports.authorizeToken = (req, res, next) => {
  const queryToken = req.query.token;
  const headerToken = req.headers.authorization;
  const token = queryToken || headerToken;

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.json({ message: 'Invalid Token' });
      } else {
        req.decoded = decoded;
        return next();
      }
    });
  } else {
    return res.status(401).json({ message: 'No token provided.' });
  }
};
