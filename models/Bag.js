const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bagSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  colorChoice: String,
  imgChoice: String,
  fontChoice: String,
  flavorChoice: [String],
  patternChoice: String,
  flavorVotes: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Bag', bagSchema);