const express = require('express')
const courseController = require('../controller/courses.controller')
const router = express.Router()

router.get("/:id", courseController.getCourse)


module.exports = router