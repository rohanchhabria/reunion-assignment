const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    followers: [
      {
        type: ObjectId,
        ref: 'User',
      },
    ],
    following: [
      {
        type: ObjectId,
        ref: 'User',
      },
    ],
    posts: [
      {
        type: ObjectId,
        ref: 'Post',
      },
    ],
    likedPosts: [
      {
        type: ObjectId,
        ref: 'Post',
      },
    ],
    commentedOn: [
      {
        type: ObjectId,
        ref: 'Post',
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
