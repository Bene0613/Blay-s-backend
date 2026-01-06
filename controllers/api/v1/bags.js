const Bag = require('../../../models/Bag');

// GET /api/v1/bags
const getAll = async (req, res) => {
  try {
    const bags = await Bag.find();

    res.json({
      status: "success",
      data: { bags }
    });

  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message
    });
  }
};

// POST /api/v1/bags
const create = async (req, res) => {
  try {
    const bag = new Bag({
  userId: req.user.userId,
  username: req.user.email,
  colorChoice: req.body.colorChoice,
  imgChoice: req.body.imgChoice,
  fontChoice: req.body.fontChoice,
  flavorChoice: req.body.flavorChoice || [],
  patternChoice: req.body.patternChoice
});

    const savedBag = await bag.save();

    res.json({
      status: "success",
      data: { bag: savedBag }
    });

  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message
    });
  }
};

const vote = async (req, res) => {
  try {
    const bag = await Bag.findById(req.params.id);

    if (!bag) {
      return res.status(404).json({ message: 'Bag not found' });
    }

    bag.flavorVotes += 1;
    await bag.save();

    res.json({
      status: 'success',
      data: { bag }
    });

  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

module.exports.getAll = getAll;
module.exports.create = create;
module.exports.vote = vote; 