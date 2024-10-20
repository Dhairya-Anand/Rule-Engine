const express = require("express");
const router = express.Router();
const evaluateController = require("../controllers/evaluate.controller");

router.post("/",evaluateController);

module.exports = evaluateController;