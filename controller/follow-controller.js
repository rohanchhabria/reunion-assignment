const userModel = require('../models/user-model')

exports.followController = async (req, res) => {
  try {
    const userToBeFollowed = await userModel.findById(req.params.id)
    if (!userToBeFollowed)
      return res.status(409).json({ error: 'User does not exist!' })
    const requestedUser = await userModel.findById(req.user._id)
    if (requestedUser.following.includes(req.params.id))
      return res.status(401).json({ error: 'Already Following' })
    userToBeFollowed.followers.push(req.user._id)
    requestedUser.following.push(req.params.id)
    await userToBeFollowed.save()
    await requestedUser.save()
    res.status(200).json({ message: 'User Followed' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

exports.unfollowController = async (req, res) => {
  try {
    const userToBeUnFollowed = await userModel.findById(req.params.id)
    if (!userToBeUnFollowed)
      return res.status(409).json({ error: 'User does not exist!' })
    const requestedUser = await userModel.findById(req.user._id)
    if (!requestedUser.following.includes(req.params.id))
      return res.status(200).json({ message: 'Unfollowed' })
    await requestedUser.following.pull(req.params.id)
    await userToBeUnFollowed.followers.pull(req.user._id)
    requestedUser.save()
    userToBeUnFollowed.save()
    res.status(200).json({ message: 'User unfollowed' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
