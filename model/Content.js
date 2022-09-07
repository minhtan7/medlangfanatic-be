const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const contentSchema = Schema(
    {
        chapter_id: Number,
        contentable_type: {
            type: String,
            enum: ["Lesson", "Assignment", "HtmlItem",
                "Iframe", "Pdf", "Survey", "Quiz", "Download"]
        },
        free: Boolean,
        id: Number,
        name: { type: String },
        position: Number,
        take_url: String
    },
    {
        timestamps: true,
    }
);

const Content = mongoose.model("Content", contentSchema)
module.exports = Content