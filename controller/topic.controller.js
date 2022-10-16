const { catchAsync, AppError, sendResponse } = require("../helpers/utils.helper")
const Topic = require("../model/Topic")


const topicController = {}

topicController.createTopic = catchAsync(async (req, res, next) => {
    const { name } = req.body
    let topic = await Topic.findOne({ name })
    if (topic) throw new AppError(404, "Topic already exists");
    topic = await Topic.create({ name })
    sendResponse(res, 200, true, topic, null, "Create new Topic")
})

topicController.getTopics = catchAsync(async (req, res, next) => {
    const topics = await Topic.find()
    sendResponse(res, 200, true, topics, null, "Create new Topic")
})

topicController.getTopicById = catchAsync(async (req, res, next) => {
    const { id } = req.params
    let topic = await Topic.findById(id)
    if (!topic) throw new AppError(404, "Post not found");
    sendResponse(res, 200, true, topic, null, "Create new Topic")
})

module.exports = topicController