import express from "express";
const router = express.Router();
import createController from "../controllers/create.controller.js";

router.post("/",createController);

export default router;