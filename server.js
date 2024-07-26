const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const blogRoute = require("./routers/blog");
const authRoute = require("./routers/auth");

require("dotenv").config();

const app = express();

// connect cloud database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: false
  })
  .then(() => console.log("=========เชื่อมต่อสพเร็จ==============="))
  .catch((err) => console.log(err));


// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use('/public', express.static('uploads'))


// routes
app.use("/api",blogRoute)
app.use("/api",authRoute)
app.get("/",(req, res) =>{
  res.json({
    message: "Hello World Kub"
  })
})


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Starting server ${port}`));
