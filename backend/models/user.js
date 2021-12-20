const mongoose = require('mongoose');
const { PROFILE_URL } = require('../configs/profileImage');

const UserSchema = new mongoose.Schema(
  {
    nickname: {
      type: String,
      required: true,
    },
    position: {
      type: String,
    },
    stacks: [String],
    sido: {
      type: String,
    },
    sigungu: {
      type: String,
    },
    imageURL: {
      type: String,
      default: PROFILE_URL,
      required: true,
    },
    snsType: {
      type: String,
      enum: ['kakao', 'google'],
      required: true,
    },
    snsId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('User', UserSchema);
