
const { apiThinkific, apiWP } = require("../../api")
const { catchAsync, AppError } = require("../../helpers/utils.helper")
const Instructor = require("../../model/Instructor")
const Course = require("../../model/Course")
const Chapter = require("../../model/Chapter")
const Content = require("../../model/Content")
const { dataInstructors } = require("../../data")
const Post = require("../../model/Post")
const { default: mongoose } = require("mongoose")
const createDataController = {}

createDataController.createInstructor = catchAsync(async (req, res, next) => {
    const data = await apiThinkific.get("/instructors")
    // await Instructor.deleteMany({})
    data.data.items.forEach(async (ins) => {
        let instructor = await Instructor.findOne({ id: ins.id })
        if (!instructor) {
            instructor = new Instructor(ins)
            instructor.title = dataInstructors[ins.id].title
            instructor.name = dataInstructors[ins.id].name
            instructor.bio = dataInstructors[ins.id].bio
            instructor.id = ins.id
            instructor.save()
        }
    })
    return res.send(data.data.items)
})

createDataController.createCourse = catchAsync(async (req, res, next) => {
    const data = await apiThinkific.get("/courses")
    await Course.deleteMany({})
    console.log(data.data.items)
    await Promise.all(data.data.items.map(async (course) => {
        Course.create(course)
    }))
    res.send(data.data.items)
})

createDataController.createCourseWithId = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const { review, faq, signUpLink, signUpDue, price, heroContent } = req.body
    const data = await apiThinkific.get(`/courses/${id}`)
    const instructorId = await Instructor.findOne({ id: data.id })
    let course = await Course.findOne({ id })
    console.log(data)
    if (course) {
        course = await Course.findOneAndUpdate({ id }, {
            ...data.data
        }, { new: true })
    }
    course = await Course.create({
        ...data.data
    })
    console.log(course)
    res.send(course)
})

createDataController.updateCourseWithId = catchAsync(async (req, res, next) => {
    const { id } = req.params
    //admin data
    const {
        review, faq,
        signUpLink, signUpDue,
        price, heroContent,
        heroDescription, material,
        feature, sellingPoint
    } = req.body
    // thinkific data
    const data = await apiThinkific.get(`/courses/${id}`)
    const { instructor_id, ...rest } = data.data

    let course = await Course.findOne({ id })
    // console.log("hrere", mongoose.Types.ObjectId())
    if (!course) {
        const _id = mongoose.Types.ObjectId()
        course = new Course({
            _id,
            ...rest,
            ...req.body,
            sellingPoint,
            instructor_id: [instructor_id]
        })
        console.log("hrere", course)
        await course.save()
    } else {
        course = await Course.findOneAndUpdate({ id }, {
            ...rest,
            ...req.body,
            sellingPoint,
            instructor_id: [instructor_id]
        }, { new: true })

    }
    console.log("hrere", course)


    res.send(course)
})

createDataController.createChapter = catchAsync(async (req, res, next) => {
    const allCourses = await Course.find()
    await Chapter.deleteMany({})
    allCourses.forEach(async (course) => {
        let duration = 0
        await Promise.all(course["chapter_ids"].map(async (id) => {
            const data = await apiThinkific.get(`/chapters/${id}`)
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

createDataController.createChapterByCourseId = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const course = await Course.findOne({ id })
    // let duration = 0
    Promise.all(course.chapter_ids.map(async chapterId => {
        try {
            const data = await apiThinkific.get(`/chapters/${chapterId}`)
            const chapter = await Chapter.findOne({ id: chapterId })
            const { content_ids,
                description,
                duration_in_seconds,
                id,
                name,
                position } = data.data
            console.log(data.data)
            const x = await Chapter.findOneAndUpdate({ id: chapterId }, {
                content_ids,
                description,
                duration_in_seconds,
                id,
                name,
                position,
            }, { new: true })
            if (!chapter) {
                // duration += data.data.duration_in_seconds
                Chapter.create(data.data)
            } else {
                // duration += data.data.duration_in_seconds
                console.log(data.data)
                const { content_ids,
                    description,
                    duration_in_seconds,
                    id,
                    name,
                    position } = data.data
                const x = await Chapter.findOneAndUpdate({ id: chapterId }, {
                    content_ids,
                    description,
                    duration_in_seconds,
                    id,
                    name,
                    position,
                }, { new: true })
                console.log("x", x)
            }
        } catch (error) {
            console.log("error", error.message)
        }

    }))

    res.send("Success")
})


createDataController.createContent = catchAsync(async (req, res, next) => {
    const allChapters = await Chapter.find()
    await Content.deleteMany({})
    allChapters.forEach(async (chapter) => {
        const data = await apiThinkific.get(`/chapters/${chapter.id}/contents`)
        data.data.items.length && await Promise.all(data.data.items.map(async (item) => {
            await Content.create(item)
        }))
    })
    // data.data.items.forEach(course => Course.create(course))
    res.send("Success")
})

createDataController.createContentByCourseId = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const course = await Course.findOne({ id })
    console.log(course, id)
    Promise.all(course.chapter_ids.map(async cid => {
        try {
            const data = await apiThinkific.get(`/chapters/${cid}/contents`)
            data.data.items.length && await Promise.all(data.data.items.map(async (item) => {
                try {

                    const content = await Content.findOne({ id: item.id })
                    console.log("content", content)
                    if (!content) {
                        await Content.create(item)
                    } else {
                        await Content.findOneAndUpdate({ id: item.id }, item, { new: true })
                    }
                } catch (error) {
                    console.log("error", error.message)
                }
            }))

        } catch (error) {
            console.log("error", error)
        }
    }))
    // data.data.items.forEach(course => Course.create(course))
    res.send("Success")
})

createDataController.createPost = catchAsync(async (req, res, next) => {
    const data = await apiWP.get("/posts")
    await Post.deleteMany()
    data.data.forEach(post => {
        const {
            id, date, slug,
            title: { rendered: title },
            content: { rendered: content },
            yoast_head_json
        } = post
        Post.create({
            wp_id: id,
            title,
            content,
            author: "6318f4aaed3db41b17baaa85",
            createdBy: "63387c0ed050dd0338854931",
            createdAt: date,
            updatedAt: date,
            slug,
            yoast_head_json: JSON.stringify(yoast_head_json),
            topic: ["6338775f8a36074dfbeaf3e4"]
        })
    })
    return res.send("hi")
})

createDataController.updateCourse = catchAsync(async (req, res, next) => {

})

module.exports = createDataController