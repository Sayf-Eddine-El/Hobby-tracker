import { signUpSchema, signInSchema } from "../utils/schema.js";
import db from "../utils/db.js";
import { hashSync, compare } from "bcryptjs";
import { SignJWT } from "jose";
import dotenv from "dotenv";

dotenv.config();

const secret = new TextEncoder().encode(process.env.JWT_SIGN_SECRET);

export const SignUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const validation = signUpSchema.safeParse({ name, email, password });

    if (!validation.success) {
      const error = new Error(
        JSON.stringify(validation.error.formErrors.fieldErrors)
      );
      error.statusCode = 401;
      throw error;
    }
    const user = db.prepare("SELECT * FROM users WHERE email = ?");

    if (user.get(email)) {
      const error = new Error(
        JSON.stringify({ message: "The user already exists" })
      );
      error.statusCode = 401;
      throw error;
    }

    const hashedPassword = await hashSync(password, 10);

    const addUser = db.prepare(
      "INSERT INTO users (name , email , password) VALUES (?,?,?)"
    );

    addUser.run([name, email, hashedPassword]);

    res
      .status(201)
      .json({ success: true, message: "The user added successfully" });
  } catch (e) {
    next(e);
  }
};

export const SignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validation = signInSchema.safeParse({ email, password });

    if (!validation.success) {
      const error = new Error(
        JSON.stringify(validation.error.formErrors.fieldErrors)
      );
      error.statusCode = 401;
      throw error;
    }
    const userPrepare = db.prepare("SELECT * FROM users WHERE email = ?");
    const user = userPrepare.get(email);
    if (!user) {
      const error = new Error(
        JSON.stringify({ message: "The information incorrect" })
      );
      error.statusCode = 401;
      throw error;
    }

    const validatePassword = await compare(password, user.password);
    if (!validatePassword) {
      const error = new Error(
        JSON.stringify({ message: "The information incorrect" })
      );
      error.statusCode = 401;
      throw error;
    }

    const token = await new SignJWT({
      id: user.id,
      email: user.email,
      name: user.name,
    })
      .setExpirationTime("1d")
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);

    res.cookie("token", token, {
      maxAge: 1000 * 60 * 60,
      httpOnly: false,
    });

    res.status(200).json({
      success: true,
      token: token,
      message: "You Sign In successfully",
    });
  } catch (e) {
    next(e);
  }
};
