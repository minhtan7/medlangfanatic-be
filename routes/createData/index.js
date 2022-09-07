var express = require('express');
const createDataController = require('../../controller/createData/createData.controller');
var router = express.Router();


router.get("/instructors", createDataController.createInstructor)
router.get("/courses", createDataController.createCourse)
router.get("/chapters", createDataController.createChapter)
router.get("/contents", createDataController.createContent)

module.exports = router