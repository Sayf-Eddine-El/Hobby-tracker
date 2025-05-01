import { jwtVerify } from "jose";
import dotenv from "dotenv";

dotenv.config();

const secret = new TextEncoder().encode(process.env.JWT_SIGN_SECRET);
export const checkToken = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    const verifyToken = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });

    if (!verifyToken) {
      res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }
    req.id = verifyToken.payload.id;
    req.email = verifyToken.payload.email;
    req.username = verifyToken.payload.name;

    next();
  } catch (e) {
    res.status(403).json({
      success: false,
      message: "Unauthorized",
    });
  }
};
