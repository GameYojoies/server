const express = require('express');
const router = express.Router();
const { create, getAllBlogs, singleBlog, removeBlog, updateBlog, getFile } = require('../controllers/blogController');
const { protect } = require('../controllers/authController');
const upload = require('../middleware/multer'); // Import multer configuration

// Create a new blog post with image upload
router.post('/create', protect, upload.single('image'), create);

// Get all blog posts
router.get('/blogs', getAllBlogs);

// Get a single blog post by slug
router.get('/blog/:slug', singleBlog);

// Delete a blog post by slug
router.delete('/blog/:slug', protect, removeBlog);

// Update a blog post by slug
router.patch('/blog/:slug', protect, updateBlog);

module.exports = router;
