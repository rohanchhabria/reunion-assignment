const router = require('express').Router()

// const { roleCheck } = require('../middlewares/roleCheck')

const {
  likeController,
  unLikeController,
} = require('../controller/likes-controller')
const { authCheck } = require('../middlewares/auth-check')

router.post('/like/:id', authCheck, likeController)
router.post('/unlike/:id', authCheck, unLikeController)

module.exports = router
