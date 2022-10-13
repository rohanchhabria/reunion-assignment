const jwt = require('jsonwebtoken')
const User = require('../models/user-model')

exports.generateToken = async (user) => {
  try {
    const payload = { _id: user._id, role: user.role }
    const token = jwt.sign(payload, process.env.JWT_SECRET)
    await User.findByIdAndUpdate(user._id, { token }, { new: true })
    return Promise.resolve({ token })
  } catch (error) {
    return Promise.reject(error)
  }
}