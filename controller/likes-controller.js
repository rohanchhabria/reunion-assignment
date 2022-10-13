const postModel = require('../models/post-model')
const userModel = require('../models/user-model')

exports.likeController = async (req, res) => {
  try {
    const { id } = req.params
    const likeCheck = await postModel.findOne({
      _id: { $eq: id },
      likedBy: { $in: req.user._id },
    })
    if (likeCheck) return res.status(201).json({ message: 'Already Liked' })

    const postToBeLiked = await postModel.findByIdAndUpdate(id, {
      $push: {
        likedBy: req.user._id,
      },
    })
    if (!postToBeLiked)
      return res.status(400).json({ error: 'Something Went Wrong' })
    const updateUser = await userModel.findByIdAndUpdate(req.user._id, {
      $push: {
        likedPosts: postToBeLiked._id,
      },
    })
    res.status(200).json({ message: 'Success' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

exports.unLikeController = async (req, res) => {
  const { id } = req.params
  try {
    const likeCheck = await postModel.findOne({
      _id: { $eq: id },
      likedBy: { $in: req.user._id },
    })
    if (!likeCheck)
      return res.status(400).json({ error: 'Something Went Wrong' })

    const postToBeUnliked = await postModel.findByIdAndUpdate(id, {
      $pull: {
        likedBy: req.user._id,
      },
    })
    if (!postToBeUnliked)
      return res.status(401).json({ error: 'Something Went Wrong' })
    const updateUser = await userModel.findByIdAndUpdate(req.user._id, {
      $pull: {
        likedPosts: postToBeUnliked._id,
      },
    })
    return res.status(200).json({ message: 'Post Unliked' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
