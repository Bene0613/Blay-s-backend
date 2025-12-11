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
      user: req.body.user,
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

module.exports.getAll = getAll;
module.exports.create = create;