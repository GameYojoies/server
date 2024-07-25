const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt'); // นำเข้า expressJwt

// โหลดค่าจากไฟล์ .env
require('dotenv').config();

exports.protect = expressJwt({
  secret: process.env.SECRET_KEY.trim(), // ใช้ SECRET_KEY จาก environment variables
  algorithms: ["HS256"], // อัลกอริธึมที่ใช้ในการเข้ารหัส
  userProperty: "auth" // ชื่อ property ที่จะเก็บข้อมูลผู้ใช้
});

exports.login = (req, res) => {
  const { username, password } = req.body; // ดึงข้อมูล username และ password จาก request body
  if (password === process.env.PASSWORD.trim()) { // ตรวจสอบรหัสผ่าน
    const token = jwt.sign({ username }, process.env.SECRET_KEY.trim(), {
      expiresIn: "1d", // ตั้งค่าการหมดอายุของ token เป็น 1 วัน
    });
    return res.json({ token, username }); // ส่ง token และ username กลับไป
  } else {
    return res.status(400).json({
      error: "Invalid password", // หากรหัสผ่านไม่ถูกต้อง
    });
  }
};
