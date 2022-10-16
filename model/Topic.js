const mongoose = require("mongoose")
const Schema = mongoose.Schema

const topicSchema = Schema({
    name: { type: String, required: true },
    isDeleted: { type: Boolean, required: true, default: false }
}, {
    timestamps: true
}
)

topicSchema.plugin(require("./plugins/isDeletedFalse"));

const Topic = mongoose.model("Topic", topicSchema)
module.exports = Topic