const express = require('express');
const router = express.Router();
const {create,getAllBlogs,singleBlog,removeBlog,updateBlog} = require("../controllers/blogController")
const {protect} = require('../controllers/authController')

router.post('/create',protect,create)
// การเรียนใช้งาน protect
router.get('/blogs',getAllBlogs)
router.get('/blog/:slug',singleBlog)
router.delete('/blog/:slug',protect,removeBlog)
router.patch('/blog/:slug',protect,updateBlog)


module.exports = router;