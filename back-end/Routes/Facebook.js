import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import User from "../models/Users.js";

const router = express.Router();

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/signIn",
  }),
  function (req, res) {
    const token = req.user.token;
    res.redirect(`http://localhost:4000/oauth/${token}`);
    console.log(token);
  }
);
router.get("/api/user", async (req, res) => {
  const token = req.headers.authorization; // Lấy token từ header
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }
  jwt.verify(
    token.split(" ")[1],
    process.env.JWT_ACCESS_TOKEN,
    async (err, decoded) => {
      if (err) {
        console.error("Token verification failed:", err);
        return res.status(401).json({ error: "Invalid token" });
      } else {
        try {
          const user = await User.findById(decoded.userId).exec();
          if (!user) {
            return res.status(404).json({ error: "User not found" });
          }
          res.json(user); // Trả về thông tin người dùng
        } catch (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Server error" });
        }
      }
    }
  );
});

export default router;
