
const api = require("../../api")
const { catchAsync } = require("../../helpers/utils.helper")
const Instructor = require("../../model/Instructor")
const Course = require("../../model/Course")
const Chapter = require("../../model/Chapter")
const Content = require("../../model/Content")
const { dataInstructors } = require("../../data")
const createDataController = {}

createDataController.createInstructor = catchAsync(async (req, res, next) => {
    const data = await api.get("/instructors")
    await Instructor.deleteMany({})
    data.data.items.forEach(ins => {
        console.log(ins)
        const instructor = new Instructor(ins)
        instructor.title = dataInstructors[ins.id].title
        instructor.name = dataInstructors[ins.id].name
        instructor.bio = dataInstructors[ins.id].bio
        instructor.save()
    })
    res.send(data.data.items)
})
createDataController.createCourse = catchAsync(async (req, res, next) => {
    const data = await api.get("/courses")
    await Course.deleteMany({})
    console.log(data.data.items)
    await Promise.all(data.data.items.map(async (course) => {
        Course.create(course)
    }))
    res.send(data.data.items)
})

createDataController.createChapter = catchAsync(async (req, res, next) => {
    const allCourses = await Course.find()
    await Chapter.deleteMany({})
    allCourses.forEach(async (course) => {
        let duration = 0
        await Promise.all(course["chapter_ids"].map(async (id) => {
            const data = await api.get(`/chapters/${id}`)
            console.log("in", duration)
            duration += data.data.duration_in_seconds
            Chapter.create(data.data)
        }))
        course.duration = duration
        console.log("out", duration)
        await course.save()
    })

    res.send("Success")
})


createDataController.createContent = catchAsync(async (req, res, next) => {
    const allChapters = await Chapter.find()
    await Content.deleteMany({})
    allChapters.forEach(async (chapter) => {
        const data = await api.get(`/chapters/${chapter.id}/contents`)
        data.data.items.length && await Promise.all(data.data.items.map(async (item) => {
            await Content.create(item)
        }))
    })
    // data.data.items.forEach(course => Course.create(course))
    res.send("Success")
})

module.exports = createDataController