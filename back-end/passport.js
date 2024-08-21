import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GithubStrategy } from "passport-github2";
import { Strategy as FacebookStrategy } from "passport-facebook";
import User from "./models/Users.js";

const GOOGLE_CLIENT_ID =
  "1021533587666-21sc999i187t8603vop53ij46m31gd44.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const GOOGLE_REDIRECT_LOGIN = "http://localhost:5000/auth/google/callback";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_REDIRECT_LOGIN,
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ email: profile.emails[0].value });
        if (user) {
          done(null, user); // If user exists, pass user to done()
        } else {
          const newUser = new User({
            username: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0]?.value || null,
          });
          await newUser.save();
          done(null, newUser); // Pass the newly created user to done()
        }
      } catch (error) {
        done(error, null); // Handle any error during user creation or retrieval
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id); // Serialize the user's _id
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // Deserialize user based on the _id
    done(null, user);
  } catch (error) {
    done(error, null); // Handle any error during deserialization
  }
});
