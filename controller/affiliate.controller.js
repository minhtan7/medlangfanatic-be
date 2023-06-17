const { catchAsync, AppError, sendResponse } = require("../helpers/utils.helper")
const Affiliate = require("../model/Affiliate")
const Course = require("../model/Course")
const User = require("../model/User")

const affiliateController = {}

const comissionRate = {
    "abc": 20
}

affiliateController.create = catchAsync(async (req, res, next) => {
    const { affiliateId: userId, email, slug } = req.body
    const user = await User.findById(userId)
    if (!user) throw new AppError(404, "User not found");
    console.log(slug)
    const course = await Course.findOne({ slug }).lean()
    console.log(course._id)
    Affiliate.create({
        courseId: course._id,
        userId,
        email: email.toLowerCase(),
        commissionRate: comissionRate[user._id.toString()],
        status: "pending"
    })
    return sendResponse(res, 200, true, null, null, "Create new affiliate")
})

const PIPELINE_ID_TO_COURSE = {
    "1": "6346bff0cafc9db5b57e6187",
    "2": "6346bff0cafc9db5b57e6189",//"Medical Terminology"
    "5": "6346bff0cafc9db5b57e6182", //"PCCS - Trình Ca Lâm Sàng",
    "6": "63ac9dd2ec3e00b7126bb033",//"CP101 - Giao tiếp với bệnh nhân",
    "7": "6346bff0cafc9db5b57e6183", // "LLM - Listening to the Language of Medicine",
    "8": "63f651dfd91bd478ce10f1a1", // "MVFree - Medical Vocabulary Free",
    // "9":// "ComboV - Combo Từ vựng",
    //     "11":// "RS - Reading Skills: The Essential Course",
    // "18":// "Luyện thi chứng chỉ",
}
affiliateController.update = catchAsync(async (req, res, next) => {
    const { email } = req.params
    const { price, pipelineId } = req.body
    console.log(email.toLowerCase(), PIPELINE_ID_TO_COURSE[pipelineId])
    let affiliate = await Affiliate.findOne({
        email: email.toLowerCase(),
        courseId: PIPELINE_ID_TO_COURSE[pipelineId]
    })
    if (!affiliate) throw new AppError(404, "Affiliate not found");
    affiliate = await Affiliate.findByIdAndUpdate(affiliate._id, {
        price,
        payTime: new Date(),
        status: "done"
    }, {
        new: true
    })
    return sendResponse(res, 200, true, null, null, "update new affiliate")
})

module.exports = affiliateController

