const PostModel = require('../models/post-model')
const moment = require('moment')
const userModel = require('../models/user-model')
const commentModel = require('../models/comment-model')

exports.postCommentController = async (req, res) => {
  try {
    const { input } = req.body
    const { id } = req.params
    if (!input)
      return res.status(400).json({ error: 'Comments Cannot Be Empty' })

    const newComment = await new commentModel({
      input,
      postedBy: req.user._id,
    }).save()

    const updatePost = await PostModel.findByIdAndUpdate(id, {
      $push: {
        comments: newComment._id,
      },
    })

    const updateUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        $push: { commentedOn: id },
      },
      { new: true }
    )
    return res.status(200).json({
      commentId: newComment._id,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
