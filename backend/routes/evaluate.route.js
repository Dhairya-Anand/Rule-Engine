import express from "express";
const router = express.Router();
import evaluateController from "../controllers/evaluate.controller.js";

router.post("/", evaluateController);

export default router;