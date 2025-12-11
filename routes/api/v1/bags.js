const express = require('express');
const router = express.Router();
const bagsController = require('../../../controllers/api/v1/bags');

// /api/v1/bags
router.get("/", bagsController.getAll);
router.post("/", bagsController.create);

console.log("BAGS ROUTER LOADED");

module.exports = router;
