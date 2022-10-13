const User = require('../models/user-model')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const { generateToken } = require('../utils/generate-token')

exports.userSignupController = async (req, res) => {
  const { name, password } = req.body
  req.body.email = req.body.email.toLowerCase()
  try {
    let user = await User.findOne({ email: req.body.email })
    if (user)
      return res.status(409).json({ message: 'E-mail already Exists!' })
    const salt = await bcrypt.genSalt(Number(process.env.SALT))
    const hashedPassword = await bcrypt.hash(password, salt)
    await new User({ ...req.body, password: hashedPassword }).save()
    return res.status(200).json({ message: 'User Created Successfully!' })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

exports.loginController = async (req, res) => {
  const { password } = req.body
  req.body.email = req.body.email.toLowerCase()

  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res
      .status(400)
      .json({ message: "User does not exist, Please Sign-up!" })
  }

  const checkPassword = await bcrypt.compare(password, user.password)

  if (!checkPassword) {
    return res.status(401).json({ message: 'Invalid Username or Password' })
  }
  const { token } = await generateToken(user)
  res.status(200).json({
    user: {
      userId: user._id,
      UserName: user.name
    },
    token,
    message: 'Logged In Successfully!',
  })
}

exports.userDetailsController = async (req, res) => {
  const { _id } = req.user
  try {
    const user = await User.findById(_id)
    if (!user) {
      res.status(403).json({ message: 'User Not found' })
    }
    res
      .status(200)
      .json({ userId: user._id, UserName: user.UserName, role: user.role })
  } catch (error) {
    res.json(500).json({ message: 'internal server error' })
  }
}

exports.logoutController = async (req, res) => {
  const { _id } = req.user
  try {
    const user = await User.findById(_id)
    if (!user) {
      res.status(400).json({ message: 'No User Found' })
    }
    user.token = null
    await user.save()
    res.status(200).json({ message: 'logged out successfully' })
  } catch (error) {
    res.json(500).json({ message: 'internal server error' })
  }
}