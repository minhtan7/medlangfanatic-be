var express = require('express');
var router = express.Router();


const createDateApi = require('./createData/index')
router.use("/data", createDateApi)

const courseApi = require("./course.api")
router.use("/courses", courseApi)

module.exports = router;
