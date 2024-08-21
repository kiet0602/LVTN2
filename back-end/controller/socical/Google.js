import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import jwt from "jsonwebtoken";

import googleAuth from "../../service/auThDal.js";
import User from "../../models/Users.js";

const GOOGLE_CLIENT_ID =
  "1021533587666-21sc999i187t8603vop53ij46m31gd44.apps.googleusercontent.com";
const GOOGLE_CLIENT_ID_SECRET = "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";
const GOOGLE_APP_REDIRECT_LOGIN = "http://localhost:5000/auth/google/callback";

const configLoginWithGoogle = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_ID_SECRET,
        callbackURL: GOOGLE_APP_REDIRECT_LOGIN,
        scope: ["profile", "email"], // Added scope parameter
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("Checking google: ", profile);
        const { failure, success } = await googleAuth.registerWithGoogle(
          profile
        );
        const user = failure || success;
        if (user) {
          console.log(
            failure
              ? "Google user already exists in DB.."
              : "Google user registered successfully.",
            user
          );
          const token = jwt.sign(
            { userInfo: user.data },
            process.env.JWT_ACCESS_TOKEN,
            { expiresIn: "1h" }
          );
          user.token = token;
          return done(null, user);
        }

        return done(new Error("Unknown error during Google authentication"));
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id); // Lưu id vào session
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id); // Lấy người dùng từ DB
    done(null, user); // Gán thông tin người dùng vào req.user
  });
};

export default configLoginWithGoogle;
