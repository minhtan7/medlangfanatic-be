const { catchAsync, sendResponse } = require("../helpers/utils.helper")
const Chapter = require("../model/Chapter")
const Course = require("../model/Course")

const courseController = {}

courseController.getCourse = catchAsync(async (req, res, next) => {
    const { id } = req.params
    console.log("id", id)
    let course = await Course.findOne({ id }).populate({ path: "chapters", populate: { path: "contents", select: "-_id -__v -createdAt -updatedAt" } }).populate({ path: "instructors", select: "-_id -__v -createdAt -updatedAt" })
    // let course = await Course.findOne({ id }).populate("chapters")
    if (course.chapters[0].constructor.name == "Array") {
        const chapterArr = {}
        course.chapters = course.chapters.map(chapter => {
            if (chapter.constructor.name == "Array") {
                for (let i = 0; i < chapter.length; i++)
                    if (!chapterArr[chapter[i].id]) {
                        chapterArr[chapter[i].id] = chapter[i]
                        return chapter[i]
                    }
            }
            return chapter
        })
        const contentArr = {}
        course.chapters.forEach(chapter => {
            chapter.contents = chapter?.contents?.map(c => {
                if (c.constructor.name == "Array") {
                    for (let i = 0; i < c.length; i++) {
                        if (!contentArr[c[i].id]) {
                            contentArr[c[i].id] = c[i]
                            return c[i]
                        }
                    }
                }
                return c
            })
        })
    }

    course.toJSON()
    sendResponse(res, 200, true, course, null, "Get Course")
})

courseController.updateCourse = catchAsync(async (req, res, next) => {
    const { id } = req.params
    console.log(id)
    const {
        review, faq,
        signUpLink, signUpDue,
        price, heroContent,
        heroDescription, material,
        feature, instructor_id
    } = req.body
    console.log(req.body)
    const course = await Course.findOneAndUpdate(
        id,
        req.body,
        { new: true }
    )
    console.log(course)
    sendResponse(res, 200, true, course, null, "Update course")
})

module.exports = courseController