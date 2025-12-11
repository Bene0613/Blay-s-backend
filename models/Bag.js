const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bagSchema = new Schema({
  user: String,
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

const Bag = mongoose.model('Bag', bagSchema);

module.exports = Bag;
