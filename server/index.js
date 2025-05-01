import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRouter from "./Routes/auth.js";
import errorMiddleWare from "./middleware/errorMiddleware.js";
import dotenv from "dotenv";
import hobbieRouter from "./Routes/hobbie.js";
import progressRouter from "./Routes/progress.js";
import goalRouter from "./Routes/goals.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(helmet());

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/hobbie", hobbieRouter);
app.use("/api/v1/progress", progressRouter);
app.use("/api/v1/goal", goalRouter);
app.use(errorMiddleWare);

app.listen(PORT, () => console.log(`The server run on PORT ${PORT}`));
