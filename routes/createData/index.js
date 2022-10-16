var express = require('express');
const createDataController = require('../../controller/createData/createData.controller');
var router = express.Router();


router.get("/instructors", createDataController.createInstructor)
router.get("/courses", createDataController.createCourse)
router.get("/chapters", createDataController.createChapter)
router.get("/contents", createDataController.createContent)
router.get("/posts", createDataController.createPost)
router.post("/courses/:id", createDataController.createCourseWithId)
router.put("/courses/:id", createDataController.updateCourseWithId)
router.get("/chapters/:id", createDataController.createChapterByCourseId)
router.get("/contents/:id", createDataController.createContentByCourseId)



module.exports = router