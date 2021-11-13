const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Model = require("../models");

const getUsers = async (req, res) => {
  try {
    const usersData = await Model.User.findAll();
    res.status(200).json({
      data: usersData,
      message: "success",
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: "server error",
    });
  }
};

const isUnique = async (email) => {
  try {
    const user = await Model.User.findAll({ where: { email } });
    if (user.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return true;
  }
};

const createUser = async (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 10);
  try {
    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
    };

    if (!isUnique(req.body.email)) {
      const saveUser = await Model.User.create(newUser);

      res.status(201).json({
        data: saveUser,
        message: "success",
      });
    } else {
      res.status(503).json({
        data: null,
        message: "email already exist",
      });
    }
  } catch (error) {
    res.status(500).json({
      data: null,
      message: "server error",
    });
  }
};

const removeUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUser = await Model.User.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      data: id,
      message: "success",
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: "server error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await Model.User.findOne({ where: { email } });
    if (user) {
      const checkPassword = bcrypt.compareSync(password, user.password);
      if (checkPassword) {
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
          },
          "secreet"
        );
        res.status(200).json({
          data: {
            token: token,
          },
          message: "success",
        });
      } else {
        res.status(404).json({
          data: null,
          message: "password wrong",
        });
      }
    } else {
      res.status(404).json({
        data: null,
        message: "email or password wrong",
      });
    }
  } catch (error) {
    res.status(500).json({
      data: null,
      message: "server error",
    });
  }
};

module.exports = {
  getUsers,
  createUser,
  removeUser,
  loginUser,
};
