import jwt from "jsonwebtoken";
import pool from "../config/dbConfig.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // Additional validation for token format
    if (token === "null" || token === "undefined" || token.length < 10) {
      return res.status(401).json({ msg: "Invalid token format" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [
      decoded.id,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).json({ msg: "Token is not valid" });
    }

    req.user = user.rows[0];
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);

    // Handle specific JWT errors
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ msg: "Invalid token" });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ msg: "Token expired" });
    }

    res.status(500).json({ msg: "Internal Server Error" });
  }
};
