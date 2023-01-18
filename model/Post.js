const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = Schema(
    {
        wp_id: { type: String },
        title: { type: String, required: true },
        content: { type: String, required: true },
        image: { type: String, default: "" },
        author: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Instructor",
        },
        topic: [{ type: Schema.Types.ObjectId, ref: "Topic", required: true }],
        createdBy: { type: Schema.Types.ObjectId, ref: "User" },
        createdAt: Date,
        slug: { type: String, required: true },
        updatedAt: Date,
        isDeleted: { type: Boolean, default: false, select: false },
        yoast_head_json: { type: String }
    },
);

postSchema.plugin(require("./plugins/isDeletedFalse"));

const Post = mongoose.model("Post", postSchema);
module.exports = Post;