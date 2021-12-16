const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    // author: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: true,
    // },
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    recruitmentStatus: {
      type: String,
      default: '모집중',
      required: true,
    },
    stacks: [String],
    capacity: {
      type: Number,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
      },
    },
    address: {
      type: String,
    },
    startDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    registerDeadline: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Post', PostSchema);
