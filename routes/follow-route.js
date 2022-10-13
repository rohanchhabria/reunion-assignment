const router = require('express').Router()

// const { roleCheck } = require('../middlewares/roleCheck')

const {
  followController,
  unfollowController,
} = require('../controller/follow-controller')
const { authCheck } = require('../middlewares/auth-check')

router.post('/follow/:id', authCheck, followController)
router.post('/unfollow/:id', authCheck, unfollowController)

module.exports = router
