const { Schema, default: mongoose } = require("mongoose");


const affiliateSchema = new Schema({
    courseId: { type: Schema.Types.ObjectId, ref: "Course" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    email: { type: String },
    commissionRate: { type: Number },
    status: { type: String, enum: ["pending", "done"] },
    payTime: { type: Date },
    isDeleted: { type: Boolean, require: true, default: false },
}, {
    timestamps: true
})

const Affiliate = mongoose.model("Affiliate", affiliateSchema)
module.exports = Affiliate