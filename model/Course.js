const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const courseSchema = Schema(
    {
        id: Number,
        name: String,
        slug: String,
        subtitle: String,
        product_id: Number,
        description: String,
        course_card_text: String,
        intro_video_youtube: String,
        contact_information: String,
        keywords: [{ type: String }],
        duration: Number,
        banner_image_url: String,
        course_card_image_url: String,
        intro_video_wistia_identifier: String,
        administrator_user_ids: [{ type: Number }],
        chapter_ids: [{ type: Number }],
        reviews_enabled: Boolean,
        user_id: Number,
        instructor_id: Number
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

courseSchema.virtual('chapters', {
    ref: 'Chapter',
    localField: 'chapter_ids',
    foreignField: 'id'
});

courseSchema.virtual('instructors', {
    ref: 'Instructor',
    localField: 'instructor_id',
    foreignField: 'id'
});

courseSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj._id;
    delete obj.id;
    delete obj.chapter_ids;
    delete obj.__v;
    delete obj.createdAt;
    delete obj.updatedAt;
    return obj;
};


const Course = mongoose.model("Course", courseSchema)
module.exports = Course