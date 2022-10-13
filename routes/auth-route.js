const router = require('express').Router()

// const { roleCheck } = require('../middlewares/roleCheck')

const {
  userSignupController,
  loginController,
  userDetailsController,
  logoutController,
} = require('../controller/auth-controller')
const { authCheck } = require('../middlewares/auth-check')

router.post('/signup', userSignupController)
router.post('/login', loginController)
router.post('/logout', authCheck, logoutController)
router.get('/userDetails', authCheck, userDetailsController)

module.exports = router