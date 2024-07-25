const express = require('express');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

// Middleware to protect routes
const protect = expressJwt({
  secret: process.env.SECRET_KEY,
  algorithms: ["HS256"],
  userProperty: "auth"
});

// Console log for debugging
console.log(process.env.SECRET_KEY, "secret");

// Login route
const login = (req, res) => {
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

// Sample protected route
app.get('/protected', protect, (req, res) => {
  res.json({ message: "You have access to this protected route", user: req.auth });
});

// Login route
app.post('/login', login);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
