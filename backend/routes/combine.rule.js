import express from "express";
const router = express.Router();
import combineController from "../controllers/combine.controller.js";

router.post("/",combineController);

export default router;