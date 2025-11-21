import express from "express";
import {
  createLog,
  getLogs,
  updateLog,
  deleteLog
} from "../controllers/logController.js";

const router = express.Router();

router.post("/", createLog);
router.get("/:userId", getLogs);
router.put("/:id", updateLog);
router.delete("/:id", deleteLog);

export default router;
