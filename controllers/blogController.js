const slugify = require("slugify");
const Blogs = require("../models/blog");
const { v4: uuidv4 } = require("uuid");
const fs = require('fs');

// Create a new blog post
exports.create = async (req, res) => {
  const { title, content, author } = req.body;
  let slug = slugify(title, { lower: true }); // Convert slug to lowercase

  if (!slug) slug = uuidv4(); // Use UUID as fallback if slug is empty

  // Validate input
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }

  try {
    const blog = await Blogs.create({
      title,
      content,
      author,
      slug,
      image: `http://212.80.215.114:5500/public/${req.file.filename}`


    });
    return res.status(201).json(blog);
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ error: "Please fill in all required fields" });
  }
};

// Get file
exports.getFile = async (req, res) => {
  try {
    const {file} = req.params;
    console.log({ file });

    try {
      let data = fs.readFileSync('uploads/'+file);
      res.send(data);
  } catch (err) {
      console.log(err);
      return res.status(404).send();
  }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all blog posts
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find({});
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single blog post by slug
exports.singleBlog = async (req, res) => {
  const { slug } = req.params;

  try {
    const blog = await Blogs.findOne({ slug });

    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    res.json(blog);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the blog post" });
  }
};

// Delete a blog post by slug
exports.removeBlog = async (req, res) => {
  const { slug } = req.params;

  try {
    const blog = await Blogs.findOneAndDelete({ slug });
    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    res.json({ message: "Blog post deleted successfully", blog });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the blog post" });
  }
};

// Update a blog post by slug
exports.updateBlog = async (req, res) => {
  const { slug } = req.params;
  const { title, content, author } = req.body;

  try {
    const updateData = { title, content, author };
    if (req.file) {
      updateData.image = req.file.path.replace(/\\/g, "/");
    }

    const blog = await Blogs.findOneAndUpdate({ slug }, updateData, {
      new: true,
    });

    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    res.json(blog);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while updating the blog post" });
  }
};
