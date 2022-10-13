const userModel = require('../models/user-model')

exports.getUserProfileController = async (req, res) => {
  try {
    const userDetails = await userModel.findById(req.body.userId)
    if (!userDetails) res.status(400).json({ error: 'User Not Found' })
    res.status(200).json({
      name: userDetails.name,
      followers: userDetails.followers.length,
      following: userDetails.following.length,
    })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
