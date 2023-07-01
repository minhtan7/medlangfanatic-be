const { default: mongoose } = require("mongoose")
const { catchAsync, AppError, sendResponse } = require("../helpers/utils.helper")
const Affiliate = require("../model/Affiliate")
const Course = require("../model/Course")
const User = require("../model/User")

const affiliateController = {}

const COMMISSION_RATE_BY_USER = {
    "648e2a14b4fc930eeb9d332a": 20
}

affiliateController.getAffiliateMonthlyRecord = catchAsync(async (req, res, next) => {
    let { id: userId, year, month } = req.params;

    if (!userId || !year || !month)
        throw new AppError(400, "User ID, Year and Month are required");

    const affiliates = await Affiliate.aggregate([
        {
            $match: {
                userId: mongoose.Types.ObjectId(userId),
                payTime: {
                    $gte: new Date(year, parseInt(month) - 1, 1),
                    $lt: new Date(year, parseInt(month), 1),
                },
                isDeleted: false,
                status: "done",
            },
        },
        {
            $group: {
                _id: "$courseId",
                totalIncome: { $sum: "$price" },
                totalUnitsSold: { $sum: 1 },
                commissionRate: { $first: "$commissionRate" },
            },
        },
        {
            $lookup: {
                from: "courses",
                localField: "_id",
                foreignField: "_id",
                as: "course",
            },
        },
        {
            $unwind: "$course",
        },
        {
            $project: {
                _id: 0,
                course_id: "$course._id",
                course_name: "$course.name",
                units_sold: "$totalUnitsSold",
                income: "$totalIncome",
                commission: { $multiply: ["$totalIncome", "$commissionRate", 0.01] },
            },
        },
    ]);
    console.log(affiliates)
    if (!affiliates || affiliates.length === 0)
        throw new AppError(404, "No affiliate data found for this month");

    // calculate total income and commission for the month
    const totalIncome = affiliates.reduce((sum, aff) => sum + aff.income, 0);
    const totalCommission = affiliates.reduce((sum, aff) => sum + aff.commission, 0);

    const result = {
        month,
        year,
        income: totalIncome,
        commission: totalCommission,
        courses_sold: affiliates
    }
    return sendResponse(res, 200, true, result, null, "Get affiliate monthly record successful");
});


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
        commissionRate: COMMISSION_RATE_BY_USER[user._id.toString()],
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

