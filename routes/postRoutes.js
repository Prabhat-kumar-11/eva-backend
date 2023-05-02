const express = require("express");
const PostRouter = express.Router();
const { PostModel } = require("../model/PostModel");

PostRouter.post("/create", async (req, res) => {
  try {
    const post = new PostModel(req.body);
    await post.save();
    res.status(200).send({ msg: "Post added" });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

PostRouter.get("/", async (req, res) => {
  try {
    const Posts = await PostModel.find({ authorID: req.body.authorID });
    res.status(200).send(Posts);
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

PostRouter.patch("/update/:PostID", async (req, res) => {
  const { PostID } = req.params;
  const post = await PostModel.findOne({ _id: PostID });
  try {
    if (req.body.authorID !== post.authorID) {
      res.status(200).send({ msg: "You are not authorized to do this action" });
    } else {
      await PostModel.findByIdAndUpdate({ _id: PostID }, req.body);
      res
        .status(200)
        .send({ msg: `The post with id:${PostID} has been updated` });
    }
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

PostRouter.delete("/delete/:PostID", async (req, res) => {
  const { PostID } = req.params;
  const post = await PostModel.findOne({ _id: PostID });
  try {
    if (req.body.authorID !== post.authorID) {
      res
        .status(200)
        .send({ msg: "You are not authorized to do this action D" });
    } else {
      await PostModel.findByIdAndDelete({ _id: PostID });
      res
        .status(200)
        .send({ msg: `The Post with id:${PostID} has been deleted` });
    }
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});
module.exports = {
  PostRouter,
};
