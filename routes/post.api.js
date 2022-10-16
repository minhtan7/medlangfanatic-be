const express = require('express')
const postController = require('../controller/post.controller')
const router = express.Router()

router.post("/", postController.createPost)
router.get('/', postController.getPosts)
router.get("/:slug", postController.getPostBySlug)
router.put("/:id", postController.editPost)


module.exports = router