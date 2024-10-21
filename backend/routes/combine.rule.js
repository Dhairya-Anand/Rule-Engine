const express = require("express");
const router = express.Router();
const combineController = require("../controllers/combine.controller");

router.post("/",combineController);

module.exports = router;