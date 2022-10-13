const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      index: true,
    },
    comments: [
      {
        type: ObjectId,
        ref: 'Comments',
      },
    ],
    postedBy: {
      type: ObjectId,
      ref: 'User',
    },
    likedBy: [
      {
        type: ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model('Post', postSchema)
