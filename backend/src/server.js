import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js";
import itemRouter from "./routes/itemRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to the server");
});
app.use("/auth", authRouter);
app.use("/items", itemRouter);
app.use("/payment", paymentRouter);
