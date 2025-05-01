import { Router } from "express";
import { checkToken } from "../middleware/checkToken.js";
import {
  addProgress,
  deleteProgress,
  getProgress,
  getStreak,
  updateProgress,
} from "../controllers/progress.js";

const progressRouter = Router();

progressRouter.post("/add-progress", checkToken, addProgress);
progressRouter.get("/get-progress", checkToken, getProgress);
progressRouter.delete("/delete-progress", checkToken, deleteProgress);
progressRouter.put("/update-progress", checkToken, updateProgress);

progressRouter.get("/get-streak", checkToken, getStreak);
export default progressRouter;
