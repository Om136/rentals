import "dotenv/config";
import cors from "cors";
import express from "express";
import authRouter from "./routes/authRoutes.js";
import itemRouter from "./routes/itemRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";

const app = express();
app.use(express.json());
const corsOrigin = process.env.CORS_ORIGIN;
app.use(
  cors({
    origin: corsOrigin ? corsOrigin.split(",").map((s) => s.trim()) : true,
    credentials: true,
  })
);
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
