const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    image: String,
    username: String,
    createdAt: {
        type: Date,
        default: new Date(),
    }
});
const Post = mongoose.model("Post", PostSchema);
module.exports = Post;