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
};

const removePost = async (req, res) => {
  try {
      const id = req.params.id
      const deletePost = await Model.Post.destroy({
          where: {
              id: id,
              author : req.user.id
          }
      })
      if (deletePost < 1) {
          rest.status(404).json({
              data: null,
              message: "failed to erase"
          })
      }
      res.status(200).json({
          data: deletePost,
          message: "sucess",
      })
  } catch (error) {
      res.status(500).json({
          data: null,
          message: "server error",
      })
  }

}

const getPosts = async (req, res) => {
  try {
      const postData = await Model.Post.findAll()
      res.status(200).json({
          data: postData,
          message: "sucess",
      })
  } catch (error) {
      res.status(500).json({
          data: null,
          message: "server error" + error,
      })
  }

}

module.exports = {
  createPost,
  removePost,
  getPosts,
};
