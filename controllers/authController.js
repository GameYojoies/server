const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt'); 
const dotenv = require('dotenv');

dotenv.config();

exports.protect = expressJwt({
  secret: process.env.SECRET_KEY,
  algorithms: ["HS256"],
  userProperty: "auth",
  getToken: (req) => {
    console.log("Authorization Header:", req.headers.authorization);
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    }
    return null;
  }
});

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (password === process.env.PASSWORD) {
    const token = jwt.sign({ username }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    return res.json({ token, username });
  } else {
    return res.status(400).json({
      error: "Invalid password",
    });
  }
};
