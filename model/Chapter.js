const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const chapterSchema = Schema(
    {
        content_ids: [{ type: Number }],
        description: String,
        duration_in_seconds: Number,
        id: Number,
        name: { type: String },
        position: Number,
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

chapterSchema.virtual('contents', {
    ref: 'Content',
    localField: 'content_ids',
    foreignField: 'id'
});

chapterSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj._id;
    delete obj.id;
    delete obj.contents_ids;
    delete obj.__v;
    delete obj.createdAt;
    delete obj.updatedAt;
    return obj;
};

const Chapter = mongoose.model("Chapter", chapterSchema)
module.exports = Chapter