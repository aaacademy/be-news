const Model = require("../models");

const createPost = async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const images =
    "https://images.unsplash.com/photo-1529528744093-6f8abeee511d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";

  try {
    const newPost = await Model.Post.create({
      title,
      description,
      images,
      author: req.user.id
    });

    res.status(201).json({
      data: newPost,
      message: "success",
    });
  } catch (error) {
    res.status(500).json({
        data: null,
        message: "server error",
      });
  }

  // const file = req.file.path
  // res.status(201).json({
  //     data: file,
  //     message: "success",
  //   });

//   res.json(req.user);
};

const removePost = async () => {}

const getPosts = async () => {}

module.exports = {
  createPost,
};
