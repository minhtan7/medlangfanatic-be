const { catchAsync, sendResponse } = require("../helpers/utils.helper")
const Course = require("../model/Course")

const courseController = {}

courseController.getCourse = catchAsync(async (req, res, next) => {
    const { id } = req.params
    let course = await Course.findOne({ id }).populate({ path: "chapters", populate: { path: "contents", select: "-_id -__v -createdAt -updatedAt" } }).populate({ path: "instructors", select: "-_id -__v -createdAt -updatedAt" })
    course.toJSON()
    sendResponse(res, 200, true, course, null, "Get Course")
})

module.exports = courseController