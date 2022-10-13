const router = require('express').Router()

// const { roleCheck } = require('../middlewares/roleCheck')

const { getUserProfileController } = require('../controller/user-controller')
const { authCheck } = require('../middlewares/auth-check')

router.get('/user', authCheck, getUserProfileController)

module.exports = router
