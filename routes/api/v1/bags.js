const express = require('express');
const router = express.Router();
const bagsController = require('../../../controllers/api/v1/bags');
const authy = require('../../../middleware/authy');


router.get('/', bagsController.getAll);

router.post('/', authy, bagsController.create);

router.patch('/:id/vote', authy, bagsController.vote);

module.exports = router;
