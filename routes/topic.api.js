const express = require('express')
const topicController = require('../controller/topic.controller')
const router = express.Router()

router.post("/", topicController.createTopic)
router.get("/", topicController.getTopics)
router.get("/:id", topicController.getTopicById)

module.exports = router