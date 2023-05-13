import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
// import protectedRoutes from "./routes/protectedRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import universityRoutes from "./routes/universityRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";

dotenv.config();

await connectDB();

const PORT = process.env.PORT || 5000;

const app = new express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/user", userRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/university", universityRoutes);
app.use("/api/course", courseRoutes)
// app.use("/", protectedRoutes);

app.listen(
  PORT,
  console.log(`Server is running in ${process.env.NODE_ENV} mode on Port ${PORT}`)
);