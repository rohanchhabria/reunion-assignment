const User = require('../models/user-model')
const jwt = require('jsonwebtoken')

exports.authCheck = async (req, res, next) => {
  const token = req.header('x-auth-token')
  try {
    const tokenDetails = jwt.verify(token, process.env.JWT_SECRET)
    req.user = tokenDetails
    next()
  } catch (error) {
    res.status(403).json({ message: 'Access Denied' })
  }
}