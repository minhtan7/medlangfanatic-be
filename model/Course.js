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
        instructor_id: [Number],
        heroContent: String,
        price: Number,
        thumbnail: String,
        review: [
            {
                reviewerName: String,
                reviewerTitle: String,
                content: String,
                imageUrl: String
            }
        ],
        faq: [
            {
                question: String,
                answer: String
            }
        ],
        signUpLink: String,
        signUpDue: Date,
        feature: {
            subject: [String],
            format: [String],
            time: [String],
            fiveStarts: [String]
        },
        heroDescription: [String],
        material: [
            {
                icon: String,
                text: String
            }
        ]
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        // _id: false
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
    delete obj.__v;
    delete obj.createdAt;
    delete obj.updatedAt;
    return obj;
};


const Course = mongoose.model("Course", courseSchema)
module.exports = Course