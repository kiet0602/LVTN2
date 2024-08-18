import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import generateTokenAndSetCookie from "../untils/helpers/generateTokenAndSetCookie.js";
import cookieParser from "cookie-parser";
import User from "../models/Users.js";
const router = express.Router();

router.use(cookieParser());

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/google/error" }),
  (req, res) => {
    // Xử lý trường hợp thành công khi người dùng đã được xác thực
    const token = req.user.token;
    res.redirect(`http://localhost:4000/oauth/${token}`);
    console.log(token);
  }
);

router.get("/api/user", async (req, res) => {
  const token = req.headers.authorization; // Lấy token từ cookie
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_ACCESS_TOKEN, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    try {
      // Tìm người dùng từ cơ sở dữ liệu
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(user); // Trả về thông tin người dùng
    } catch (err) {
      return res.status(500).json({ error: "Server error" });
    }
  });
});

export default router;
