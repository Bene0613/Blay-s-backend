const Bag = require('../../../models/Bag');

// GET /api/v1/bags
const getAll = async (req, res) => {
  try {
    let query = {};

    if (req.user) {
      query.userId = req.user.userId;
    }

    const bags = await Bag.find(query);

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

exports.getOne = async (req, res) => {
  try {
    const bag = await Bag.findById(req.params.id);

    if (!bag) {
      return res.status(404).json({ message: 'Bag not found' });
    }

    res.json({
      status: 'success',
      data: { bag }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
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

const getMyBags = async (req, res) => {
  try {
    const bags = await Bag.find({ userId: req.user.userId });

    res.json({
      status: 'success',
      data: { bags }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

const remove = async (req, res) => {
  try {
    await Bag.findByIdAndDelete(req.params.id);
    res.json({ status: 'success' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const bag = await Bag.findById(req.params.id);

    if (!bag) {
      return res.status(404).json({ message: 'Bag not found' });
    }

    // Optional: owner check
    if (bag.userId !== req.user.userId) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    Object.assign(bag, req.body);
    await bag.save();

    res.json({
      status: 'success',
      data: { bag }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getAll = getAll;
module.exports.create = create;
module.exports.vote = vote; 
module.exports.getMyBags = getMyBags;
module.exports.remove = remove;