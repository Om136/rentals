import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/dbConfig.js";

export const signUp = async (req, res) => {
  try {
    const { email, password,name } = req.body;
    // check for existing user
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length !== 0) {
      return res.status(400).json({ msg: "User[email] already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await pool.query(
      "INSERT INTO users(email,password,name) VALUES($1,$2,$3) RETURNING *",
      [email, hashedPassword,name]
    );

    const token = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
