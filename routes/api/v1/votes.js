const express = require('express');
const router = express.Router();
const authy = require('../../../middleware/authy');
const Bag = require('../../../models/Bag');

router.post('/:bagId', authy, async (req, res) => {
  const bag = await Bag.findById(req.params.bagId);
  if (!bag) return res.status(404).json({ message: 'Bag not found' });

  bag.flavorVotes += 1;
  await bag.save();

  res.json({ status: 'success', votes: bag.flavorVotes });
});

router.delete('/:bagId', authy, async (req, res) => {
  const bag = await Bag.findById(req.params.bagId);
  if (!bag) return res.status(404).json({ message: 'Bag not found' });

  bag.flavorVotes = Math.max(0, bag.flavorVotes - 1);
  await bag.save();

  res.json({ status: 'success', votes: bag.flavorVotes });
});

const theAdmin = require('../../../middleware/theAdmin');

router.get('/', authy, theAdmin, async (req, res) => {
  const bags = await Bag.find().sort({ flavorVotes: -1 });
  res.json({
    status: 'success',
    data: bags
  });
});


module.exports = router;
