const slugify = require("slugify"); // ตรวจสอบว่ามีการนำเข้า slugify อยู่หรือไม่
const Blogs = require("../models/blog");
const { v4: uuidv4 } = require("uuid");
exports.create = async (req, res) => {
  const { title, content, author } = req.body;
  let slug = slugify(title); // เช็คว่า slugify ถูกเรียกใช้งานอย่างถูกต้องหรือไม่

  if (!slug) slug = uuidv4();

  // ตรวจสอบข้อมูล
  switch (true) {
    case !title:
      return res.status(400).json({
        error: "title is required",
      });
    case !content:
      return res.status(400).json({
        error: "content is required",
      });
  }

  try {
    const blog = await Blogs.create({ title, content, author, slug });
    return res.json(blog);
  } catch (error) {
    return res.status(400).json({ error: "กรุณากรอกข้อมูลให้ครบ" });
  }
};

// ฟังชั่นดึงข้อมูล
exports.getAllBlogs = (req, res) => {
  Blogs.find({})
    .exec()
    .then((blogs) => {
      res.json(blogs);
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
};

// ดึงข้อมูลตาม slug ที่สนใจ
exports.singleBlog = async (req, res) => {
  const { slug } = req.params;

  try {
    const blog = await Blogs.findOne({ slug });

    if (!blog) {
      return res.status(404).json({ error: "Blog post not found." });
    }

    res.json(blog);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the blog post." });
  }
};

// ลบข้อมูล
exports.removeBlog = (req, res) => {
  const { slug } = req.params;
  Blogs.findOneAndDelete({ slug })
    .then((blog) => {
      res.json({
        message: "Blog post deleted successfully.",
        blog,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "An error occurred while deleting the blog post.",
      });
    });
};

// อัพเดทข้อมูล
exports.updateBlog = (req, res)=>{
  const { slug } = req.params;
  const { title, content, author } = req.body;
  Blogs.findOneAndUpdate(
    { slug },
    { title, content, author },
    { new: true }
  )
   .then((blog) => {
      res.json(blog);
    })
   .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "An error occurred while updating the blog post.",
      });
    });
}
