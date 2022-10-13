const router = require('express').Router()

// const { roleCheck } = require('../middlewares/roleCheck')

const {
  createPostController,
  deletePostController,
  getPostController,
  getAllPostController,
} = require('../controller/post-controller')
const { authCheck } = require('../middlewares/auth-check')

router.post('/post', authCheck, createPostController)
router.delete('/posts/:id', authCheck, deletePostController)
router.get('/post/:id', authCheck, getPostController)
router.get('/all_posts', authCheck, getAllPostController)

module.exports = router
