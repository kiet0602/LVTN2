import User from "../models/Users.js";
import generateTokenAndSetCookie from "../untils/helpers/generateTokenAndSetCookie.js";

const googleAuthDal = {
  registerWithGoogle: async (oauthUser) => {
    const isUserExists = await User.findOne({
      email: oauthUser.emails[0].value,
      role: "customer",
    });

    if (isUserExists) {
      return {
        failure: {
          status: 400,
          message: "Người dùng đã được đăng ký.",
          data: isUserExists,
        },
      };
    }

    const userData = {
      username: oauthUser.displayName,
      email:
        oauthUser.emails && oauthUser.emails.length > 0
          ? oauthUser.emails[0].value
          : oauthUser.id,
      avatar:
        oauthUser.photos && oauthUser.photos.length > 0
          ? oauthUser.photos[0].value
          : "",
      role: "customer",
      password: "",
      phoneNumber: "", // Set to empty string if not available
    };

    const user = new User(userData);
    const newUser = await user.save();
    return {
      success: {
        status: 200,
        message: "Người dùng đã được đăng ký.",
        data: newUser,
      },
    };
  },

  registerWithFacebook: async (oauthUser) => {
    const email =
      oauthUser.emails && oauthUser.emails.length > 0
        ? oauthUser.emails[0].value
        : oauthUser.id + "@facebook.com";

    const isUserExists = await User.findOne({
      email: email,
      role: "customer",
    });

    if (isUserExists) {
      return {
        failure: {
          status: 400,
          message: "Người dùng đã được đăng ký.",
          data: isUserExists,
        },
      };
    }

    const userData = {
      username: oauthUser.displayName,
      email: email,
      avatar:
        oauthUser.photos && oauthUser.photos.length > 0
          ? oauthUser.photos[0].value
          : "",
      role: "customer",
      password: "",
      phoneNumber: "", // Set to empty string if not available
    };

    const user = new User(userData);
    const newUser = await user.save();
    return {
      success: {
        status: 200,
        message: "Người dùng đã được đăng ký.",
        data: newUser,
      },
    };
  },
};

export default googleAuthDal;
