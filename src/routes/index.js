import express from "express";
import itemController from "../controllers/itemController.js";
import listController from "../controllers/listController.js";

const router = express.Router();

// Define your routes using the controller functions
router.get("/", itemController.getIndex);
router.get("/:customList", listController.getCustomList);
router.post("/", itemController.postItem);
router.post("/delete", itemController.deleteItem);

export default router;