const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: 'String',
      required: true,
    },
    parentType: {
      type: 'String',
      enum: ['post', 'comment'],
      required: true,
    },
    parentId: {
      type: 'String',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Comment', CommentSchema);
