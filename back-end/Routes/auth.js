import express from "express";
import passport from "passport";

import generateTokenAndSetCookie from "../untils/helpers/generateTokenAndSetCookie.js";

const router = express.Router();
const CLIENT_URL = "http://localhost:4000/";

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "success",
      user: req.user, // Return the whole user object, including _id
    });
    console.log(req.user);
  } else {
    res.status(401).json({
      success: false,
      message: "Not authenticated",
    });
  }
});
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect(CLIENT_URL);
  });
});
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login/failed" }),
  async (req, res) => {
    try {
      if (!req.user) {
        return res.redirect("/login/failed");
      }
      // Generate token and set cookie
      generateTokenAndSetCookie(req.user._id, res);

      // Redirect to /login/success
      res.redirect("http://localhost:4000/test");
    } catch (error) {
      console.error("Error during Google callback:", error);
      res.redirect("/login/failed");
    }
  }
);
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "Failed to authenticate",
  });
});

export default router;
