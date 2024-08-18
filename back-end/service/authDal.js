import User from "../models/Users.js";

const googleAuthDal = {
  registerWithGoogle: async (oauthUser) => {
    const isUserExists = await User.findOne({
      email: oauthUser.emails[0].value,
      role: "customer",
    });
    if (isUserExists) {
      const failure = {
        status: 400,
        message: "User already Registered.",
        data: isUserExists,
      };
      return { failure };
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
      //     phoneNumber: oauthUser.phoneNumber || "", // Gán giá trị mặc định nếu không có số điện thoại
    };

    const user = new User(userData);

    const newUser = await user.save();
    const success = {
      status: 200,
      message: "User Registered.",
      data: newUser,
    };
    return { success };
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
      const failure = {
        status: 400,
        message: "User already Registered.",
        data: isUserExists,
      };
      return { failure };
    }

    const userData = {
      username: oauthUser.displayName,
      email: email,
      avatar:
        oauthUser.photos && oauthUser.photos.length > 0
          ? oauthUser.photos[0].value
          : "",
      role: "customer",
      phoneNumber: oauthUser.phoneNumber || "", // Gán giá trị mặc định nếu không có số điện thoại
    };
    const user = new User(userData);
    const newUser = await user.save();
    const success = {
      status: 200,
      message: "User Registered.",
      data: newUser,
    };
    return { success };
  },
};

export default googleAuthDal;
