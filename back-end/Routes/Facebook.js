import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import generateTokenAndSetCookie from "../untils/helpers/generateTokenAndSetCookie.js";
import cookieParser from "cookie-parser";
import User from "../models/Users.js";
const router = express.Router();

router.use(cookieParser());

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/auth/facebook/error",
  }),
  (req, res) => {
    // Xử lý trường hợp thành công khi người dùng đã được xác thực
    if (req.user) {
      // Thay thế việc tạo token trực tiếp bằng generateTokenAndSetCookie
      generateTokenAndSetCookie(req.user._id, res);
      res.redirect(`http://localhost:4000`);
    } else {
      res.redirect("/auth/facebook/error");
    }
  }
);

router.get("/api/user", async (req, res) => {
  const token = req.cookies.jwt; // Lấy token từ cookie
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    } else {
      try {
        // Tìm người dùng từ cơ sở dữ liệu
        const user = await User.findById(decoded.userId).exec();
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        res.json(user); // Trả về thông tin người dùng
      } catch (err) {
        return res.status(500).json({ error: "Server error" });
      }
    }
  });
});

export default router;
