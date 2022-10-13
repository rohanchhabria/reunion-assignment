const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const commentSchema = new mongoose.Schema(
  {
    input: {
      type: String,
      required: true,
      index: true,
    },
    postedBy: {
      type: ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Comments', commentSchema)
