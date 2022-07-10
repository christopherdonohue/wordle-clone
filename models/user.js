const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  firstAttempts: {
    type: Number,
    default: 0,
  },
  secondAttempts: {
    type: Number,
    default: 0,
  },
  thirdAttempts: {
    type: Number,
    default: 0,
  },
  fourthAttempts: {
    type: Number,
    default: 0,
  },
  fifthAttempts: {
    type: Number,
    default: 0,
  },
  sixthAttempts: {
    type: Number,
    default: 0,
  },

  totalGames: {
    type: Number,
    default: 0,
  },

  currentScore: {
    type: Number,
    default: 0,
  },

  creationDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model('user', userSchema);
