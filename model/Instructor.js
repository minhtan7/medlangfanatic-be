const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const instructorSchema = Schema(
    {
        id: Number,
        first_name: String,
        last_name: String,
        bio: String,
        created_at: Date,
        user_id: Number,
        title: String,
        slug: String,
        avatar_url: String,
        email: String
    },
    {
        timestamps: true,
    }
);

instructorSchema.statics.findOrCreate = function findOrCreate(profile, cb) {
    var userObj = new this();
    this.findOne({ email: profile.email }, async function (err, result) {
        if (!result) {
            userObj.id = profile.id;
            userObj.first_name = profile.first_name;
            userObj.last_name = profile.last_name;
            userObj.bio = profile.bio;
            userObj.created_at = profile.created_at;
            userObj.user_id = profile.user_id;
            userObj.title = profile.title;
            userObj.slug = profile.slug;
            userObj.avatar_url = profile.avatar_url;
            userObj.email = profile.email
            userObj.save(cb);
        } else {
            cb(err, result);
        }
    });
};

instructorSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj._id;
    delete obj.__v;
    return obj;
};



const Instructor = mongoose.model("Instructor", instructorSchema);
module.exports = Instructor;
