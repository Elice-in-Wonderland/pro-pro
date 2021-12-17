const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const BookmarkSchema = new mongoose.Schema(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

module.exports = mongoose.model('Bookmark', BookmarkSchema);
