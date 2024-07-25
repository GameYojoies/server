const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const blogRoute = require("./routers/blog");
const authRoute = require("./routers/auth");

require("dotenv").config();

const app = express();

// เชื่อมต่อกับฐานข้อมูล MongoDB
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true // ควรใช้ true แทน false
  })
  .then(() => console.log("=========เชื่อมต่อสำเร็จ==============="))
  .catch((err) => console.log(err));

// ตั้งค่า middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use('/public', express.static('uploads'));

// ตั้งค่าเส้นทาง
app.use("/api/blog", blogRoute); // เพิ่ม path prefix สำหรับเส้นทางของ blog
app.use("/api/auth", authRoute); // เพิ่ม path prefix สำหรับเส้นทางของ auth
app.get("/", (req, res) => {
  res.json({
    message: "Hello World Kub"
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Starting server on port ${port}`));
