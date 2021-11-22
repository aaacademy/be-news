const multer = require('multer')
const { createPost } = require('../controllers/post.controller')
const { getUsers, createUser, removeUser, loginUser } = require('../controllers/user.controller')
const { checkToken } = require('../middleware/hasLogin.middleware')

const upload = multer({ dest: 'uploads/' })

const route = require('express').Router()

route.get('/users', getUsers)
route.post('/users', createUser)
route.delete('/users/:id', checkToken, removeUser)
route.post('/login', loginUser)

route.post('/posts', checkToken, createPost)

module.exports = route