const express = require('express');
const router = express.Router();
const { login, protect } = require('../controllers/authController');

// Route สำหรับการเข้าสู่ระบบ
router.post('/login', login);

// Route ที่ต้องการการตรวจสอบ JWT
router.get('/protected', protect, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

module.exports = router;
