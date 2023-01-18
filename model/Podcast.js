const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const podcastSchema = Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        image: { type: String, default: "" },
        author: {
            type: Schema.Types.ObjectId,
            ref: "Instructor",
        },
        slug: { type: String, required: true },
        isDeleted: { type: Boolean, default: false, select: false },
        embedLink: { type: String, required: true },
        siteLink: [
            {
                link: String,
                siteName: { type: String, enum: ['spotify'] }
            }
        ]
    }
);

podcastSchema.plugin(require("./plugins/isDeletedFalse"));

const Podcast = mongoose.model("Podcast", podcastSchema);
module.exports = Podcast;