import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

// Initiates Google authentication
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Handles Google authentication callback
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/google/error" }),
  (req, res) => {
    const token = req.user.token;
    // Set JWT in httpOnly cookie
    res.cookie("jwt", token, {
      httpOnly: true, // Prevents JavaScript from accessing the cookie
      maxAge: 15 * 24 * 60 * 60 * 1000, // Cookie expiration (15 days)
      sameSite: "Strict", // Helps prevent CSRF attacks
    });
    // Redirect to frontend
    res.redirect(`http://localhost:4000/`);
  }
);

// Route to get user data
router.get("/api/user", (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const userData = decoded.userInfo;
    res.json(userData);
  });
});

// Route for handling errors
router.get("/auth/google/error", (req, res) => {
  res.status(500).send("Authentication failed");
});

export default router;
