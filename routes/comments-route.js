const router = require('express').Router()

const { postCommentController } = require('../controller/comments-controller')
const { authCheck } = require('../middlewares/auth-check')

router.post('/comment/:id', authCheck, postCommentController)

module.exports = router
