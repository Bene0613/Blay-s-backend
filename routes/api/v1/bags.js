const express = require('express');
const router = express.Router();
const bagsController = require('../../../controllers/api/v1/bags');
const authy = require('../../../middleware/authy');
const { verifyToken } = require('../../../controllers/api/v1/jwt');
const theAdmin = require('../../../middleware/theAdmin');


router.get('/', bagsController.getAll);

router.get('/:id', bagsController.getOne);

router.post('/', authy, bagsController.create);

router.patch('/:id/vote', authy, bagsController.vote);

router.delete('/:id', verifyToken, theAdmin, bagsController.remove);

router.put('/:id', authy, bagsController.update);

module.exports = router;
