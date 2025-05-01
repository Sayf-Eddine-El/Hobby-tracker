import { Router } from "express";
import {
  deleteHobbie,
  getHobbie,
  postHobbie,
  updateHobbie,
} from "../controllers/hobbie.js";
import { checkToken } from "../middleware/checkToken.js";
const hobbieRouter = Router();

hobbieRouter.get("/get-hobbie", checkToken, getHobbie);
hobbieRouter.post("/post-hobbie", checkToken, postHobbie);
hobbieRouter.delete("/del-hobbie", checkToken, deleteHobbie);
hobbieRouter.put("/update-hobbie", checkToken, updateHobbie);
export default hobbieRouter;
