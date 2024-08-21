import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import facebookAuth from "../../service/auThDal.js";
import jwt from "jsonwebtoken";

const configLoginWithFacebook = () => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_ID_SECRET,
        callbackURL: process.env.FACEBOOK_APP_REDIRECT_LOGIN,
        profileFields: ["id", "emails", "name", "displayName"], // Các trường profile bạn muốn lấy từ Facebook
      },
      async (accessToken, refreshToken, profile, cb) => {
        console.log("Checking Facebook: ", profile);
        const { failure, success } = await facebookAuth.registerWithFacebook(
          profile
        );
        const user = failure || success;

        if (user) {
          console.log(
            failure
              ? "Facebook user already exists in DB.."
              : "Registering new Facebook user..",
            user
          );
          const token = jwt.sign(
            { userInfo: user.data },
            process.env.JWT_ACCESS_TOKEN,
            { expiresIn: "1h" }
          );
          user.token = token;
          return cb(null, user);
        }

        return cb(new Error("Unknown error during Facebook authentication"));
      }
    )
  );

  // Serialize user to store in session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // Deserialize user from session
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
};

export default configLoginWithFacebook;
