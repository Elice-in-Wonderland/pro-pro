const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    nickname: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
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
      default:
        'https://user-images.githubusercontent.com/68373235/146498583-71b583f6-04d7-43be-b790-bbb264a95390.png',
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
