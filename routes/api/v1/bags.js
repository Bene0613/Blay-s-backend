const express = require('express');
const router = express.Router();
const bagsController = require('../../../controllers/api/v1/bags');
const authy = require('../../../middleware/authy');

// /api/v1/bags
router.get('/', bagsController.getAll);

router.post('/', bagsController.create);

router.patch('/:id/vote', bagsController.vote);

console.log("BAGS ROUTER LOADED");

module.exports = router;
