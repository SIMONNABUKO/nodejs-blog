const mongoose = require("mongoose");
const Post = require("../database/models/Post");
module.exports = async (req, res) => {
  try {
    let id = req.params.id;
    if (mongoose.Types.ObjectId.isValid(id)) {
      const post = await Post.findById(id);
      res.render("post", {
        post,
      });
    }
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};
