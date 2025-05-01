import { Router } from "express";
import { SignIn, SignUp } from "../controllers/auth.js";
import { checkToken } from "../middleware/checkToken.js";
const authRouter = Router();

authRouter.post("/sign-up", SignUp);
authRouter.post("/sign-in", SignIn);
authRouter.post("/check-token", checkToken, (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: { id: req.id, email: req.email, name: req.username },
    });
  } catch (e) {
    next(e);
  }
});
export default authRouter;
