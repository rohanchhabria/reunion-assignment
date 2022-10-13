const PostModel = require('../models/post-model')
const moment = require('moment')
const userModel = require('../models/user-model')

exports.createPostController = async (req, res) => {
  try {
    const { title, description } = req.body
    if (!title || !description)
      return res.status(400).json({ error: 'All fields are required' })

    const newPost = await new PostModel({
      title,
      description,
      postedBy: req.user._id,
    }).save()
    const userPosted = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        $push: { posts: newPost._id },
      },
      { new: true }
    )
    return res.status(200).json({
      postId: newPost._id,
      title: newPost.title,
      description: newPost.description,
      createdAt: moment(newPost.createdAt).utc(),
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

exports.deletePostController = async (req, res) => {
  try {
    const postToBeDeleted = await PostModel.findOneAndDelete({
      _id: { $eq: req.params.id },
      postedBy: { $eq: req.user._id },
    })
    const user = await userModel.findByIdAndUpdate(req.user._id, {
      $pull: { posts: postToBeDeleted._id },
    })
    return res.status(200).json({ message: 'Post Deleted' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

exports.getPostController = async (req, res) => {
  const { id } = req.params
  try {
    const post = await PostModel.findById(id).populate('comments postedBy')
    if (!post) return res.status(400).json({ error: 'Something Went Wrong' })

    return res.status(200).json({
      title: post.title,
      description: post.description,
      postedBy: post.postedBy.name,
      likes: post.likedBy.length,
      comments: post.comments,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

exports.getAllPostController = async (req, res) => {
  try {
    const response = []
    const posts = await PostModel.find({ postedBy: req.user._id })
      .sort({
        createdAt: -1,
      })
      .populate('comments')
    if (!posts) return res.status(400).json({ error: 'Something Went Wrong' })
    for (let post of posts) {
      let data = {}
      data['id'] = post._id
      data['title'] = post.title
      data['description'] = post.description
      data['createdAt'] = moment(post.createdAt).format('DD/MMM/YYYY hh:mm:ss')
      data['comments'] = post.comments
      data['likes'] = post.likedBy.length
      response.push(data)
    }
    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
