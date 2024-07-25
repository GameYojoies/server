const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const dotenv = require('dotenv');
dotenv.config();

exports.protect = expressJwt({
  secret: process.env.SECRET_KEY,
  algorithms: ["HS256"],
  userProperty: "auth"
});

console.log(process.env.SECRET_KEY); // เพื่อตรวจสอบว่าค่า SECRET_KEY ถูกโหลดหรือไม่

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