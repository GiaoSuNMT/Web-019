const express = require("express");
const PostModel = require("./models");

const postRouter = express();

postRouter.post("/", async (req, res) => {
  try {
    if (!req.session.user) {
      res.status(403).json({
        message: "Unauthenticated"
      });
    }

    if (
      req.session.user &&
      req.session.user.permissions.indexOf("POST.CREATE") > -1
    ) {
      const postInfo = req.body;
      const newPost = await PostModel.create(postInfo);

      res.status(201).json(newPost);
    } else {
      res.status(403).json({
        message: "Unauthorized"
      });
    }
  } catch (err) {
    res.status(500).end(err.message);
  }
});

postRouter.get("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const postInfo = await PostModel.findById(postId)
      //   .populate("author", "email firstName createdAt")
      .populate({ path: "author", select: "email firstName createdAt" })
      .exec();
    res.status(200).json(postInfo);
  } catch (err) {
    res.status(500).end(err.message);
  }
});

postRouter.get("/", async (req, res) => {
  //phan trang: cursor paging, offset paging

  try {
    const { pageNumber, pageSize } = req.query;
    // const totalRecord = await PostModel.find().countDocuments(); //find({dieu kien neu co})
    const data = await PostModel.find()
      // .sort({})
      .skip(Number(pageSize) * Number(pageNumber - 1))
      .limit(Number(pageSize))
      .exec();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).end(err.message);
  }
});

module.exports = postRouter;
