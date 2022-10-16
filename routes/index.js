var express = require('express');
var router = express.Router();


const createDateApi = require('./createData/index')
router.use("/data", createDateApi)

const courseApi = require("./course.api")
router.use("/courses", courseApi)

const postApi = require("./post.api")
router.use("/posts", postApi)

const topicApi = require("./topic.api")
router.use("/topics", topicApi)

const userApi = require("./user.api")
router.use("/users", userApi)

module.exports = router;
