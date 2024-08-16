import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";

import facebookAuth from "../../service/authDal.js";

const configLoginWithFacebook = () => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_ID_SECRET, // Correct Client Secret
        callbackURL: process.env.FACEBOOK_APP_REDIRECT_LOGIN,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("Checking Facebook: ", profile);
        const { failure, success } = await facebookAuth.registerWithFacebook(
          profile
        );

        if (failure) {
          return done(null, failure.data); // Send error data to the client
        }

        if (success) {
          console.log("Facebook user registered successfully.", success.data);
          // Use generateTokenAndSetCookie in the passport callback
          return done(null, success.data);
        }
        return done(new Error("Unknown error during Facebook authentication"));
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

export default configLoginWithFacebook;
