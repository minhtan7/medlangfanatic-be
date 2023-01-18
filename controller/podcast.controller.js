const { createSlug } = require("../helpers/slug.helper")
const { catchAsync, sendResponse } = require("../helpers/utils.helper")
const Podcast = require("../model/Podcast")


const podcastController = {}

podcastController.getAllPodcasts = catchAsync(async (req, res, next) => {
    let { limit, page, ...filterQuery } = req.query
    limit = parseInt(limit) | 10
    page = parseInt(page) | 1
    const allowFilter = ["title", 'content']
    let filter = {}
    for (let [key, value] of Object.entries(filterQuery)) {
        if (!allowFilter.find(key)) {
            delete filterQuery[key]
        }
        filter[key] = { $regex: value }
    }

    let totalPodcast = await Podcast.find(filter).countDocuments()
    let totalPage = Math.ceil(totalPodcast / limit)
    let offset = (page - 1) * limit
    let podcasts = await Podcast.find(filter).limit(limit).skip(offset)
    sendResponse(res, 200, true, { podcasts, totalPage }, null, "Get All podcasts")
})

podcastController.getSinglePodcast = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const podcast = await Podcast.findById(id)
    sendResponse(res, 200, true, podcast, null, "Get single podcast")
})

podcastController.createPodcast = catchAsync(async (req, res, next) => {
    const { title, content, image, author, embedLink, siteLink } = req.body
    const slug = createSlug(title)
    const podcast = await Podcast.create({
        tilte,
        content,
        image,
        author,
        embedLink,
        siteLink,
        slug
    })
    sendResponse(res, 200, true, podcast, null, "Create podcast success")
})

podcastController.updatePodcast = catchAsync(async (req, res, next) => {

})

podcastController.deletePodcast = catchAsync(async (req, res, next) => {

})


module.exports = podcastController