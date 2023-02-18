const { request } = require("express")
const { createSlug } = require("../helpers/slug.helper")
const { catchAsync, sendResponse, AppError } = require("../helpers/utils.helper")
const Post = require("../model/Post")
const APIFeature = require("../utils/apiFeature")


const postController = {}

postController.createPost = catchAsync(async (req, res, next) => {
    const { title, content, image, author, topic, createdBy, createdAt } = req.body
    const slug = createSlug(title)
    let post = await Post.findOne({ slug })
    if (post) throw new AppError(404, "Post already exists");
    post = await Post.create({ title, content, image, author, topic, createdBy, slug, createdAt })
    sendResponse(res, 200, true, post, null, "Post created")
})



postController.getPosts = catchAsync(async (req, res, next) => {
    let features = new APIFeature(Post.find(), req.query).filter().sortFields().limitFields()
    const totalPost = await features.query.countDocuments()
    const totalPage = Math.ceil(totalPost / (parseInt(req.query.limit) || 9))
    page = parseInt(req.query.page) || 1

    features = new APIFeature(Post.find(), req.query).filter().sortFields().limitFields().paginate()
    const posts = await features.query.populate("topic")

    // limit = parseInt(limit) || 10
    // const offset = (page - 1) * limit
    // const posts = await Post.find(filter).skip(offset).limit(limit).sort({ createdAt: -1 }).populate("topic")
    sendResponse(res, 200, true, { posts, totalPage, page, totalPost }, null, "Get posts")
})

postController.searchPosts = catchAsync(async (req, res, next) => {
    let features = new APIFeature(Post.find(), req.params).search().limitFields().paginate()
    const totalPost = await features.query.clone().countDocuments()
    const totalPage = Math.ceil(totalPost / (parseInt(req.params.limit) || 5))
    page = parseInt(req.params.page) || 1

    const posts = await features.query.clone().populate("topic")
    console.log(totalPage, page, posts)
    sendResponse(res, 200, true, { posts, totalPage, page, totalPost }, null, "Get all posts")
})

postController.getPostBySlug = catchAsync(async (req, res, next) => {
    const { slug } = req.params
    const post = await Post.findOne({ slug }).populate("topic").lean()
    if (!post) throw new AppError(404, "Post not found");
    const ranndomPostIndex = Math.floor(Math.random() * post.topic.length)

    const relatedPost = await Post.find({ topic: { $in: [post.topic[ranndomPostIndex]] } })
    post.relatedPost = relatedPost
    sendResponse(res, 200, true, post, null, "Get single post")
})

postController.editPost = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const { title, content, image, author, topic, updatedBy } = req.body
    let post = await Post.findById(id)
    if (!post) throw new AppError(404, "Post not found");
    post = await Post.findByIdAndUpdate(id, { title, content, image, author, topic, updatedBy }, { new: true })
    sendResponse(res, 200, true, post, null, "Post updated")
})

module.exports = postController 