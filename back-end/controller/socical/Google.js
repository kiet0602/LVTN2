import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import googleAuth from "../../service/authDal.js";

const configLoginWithGoogle = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_ID_SECRET, // Sửa Client Secret
        callbackURL: process.env.GOOGLE_APP_REDIRECT_LOGIN,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("Checking google: ", profile);
        const { failure, success } = await googleAuth.registerWithGoogle(
          profile
        );

        if (failure) {
          return done(null, failure.data); // Đưa dữ liệu lỗi về phía client
        }

        if (success) {
          console.log("Google user registered successfully.", success.data);
          // Sử dụng generateTokenAndSetCookie trong callback của passport
          return done(null, success.data);
        }

        return done(new Error("Unknown error during Google authentication"));
      }
    )
  );

  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });
};

export default configLoginWithGoogle;
