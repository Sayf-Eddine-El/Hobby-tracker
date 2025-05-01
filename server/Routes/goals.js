import { Router } from "express";
import { checkToken } from "../middleware/checkToken.js";
import {
  addGoal,
  deleteGoal,
  getGoal,
  updateGoal,
} from "../controllers/goals.js";

const goalRouter = Router();

goalRouter.post("/add-goal", checkToken, addGoal);
goalRouter.get("/get-goal", checkToken, getGoal);
goalRouter.delete("/delete-goal", checkToken, deleteGoal);
goalRouter.put("/update-goal", checkToken, updateGoal);
export default goalRouter;
