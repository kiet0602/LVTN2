import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../untils/helpers/generateTokenAndSetCookie.js";
//////////////////////////////////////
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: "Không có để lấy tất cả User" });
    }
  } catch (err) {
    res.status(500).json({ message: "Lỗi lấy tất cả người dùng" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Không tìm thấy user" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Lỗi server" });
  }
};

const signUpUser = async (req, res) => {
  try {
    const { username, email, password, phoneNumber } = req.body;

    // Kiểm tra xem email đã tồn tại chưa
    const existingEmailUser = await User.findOne({ email });
    if (existingEmailUser) {
      return res.status(400).json({ message: "Email đã được sử dụng" });
    }

    // Kiểm tra xem số điện thoại đã tồn tại chưa
    const existingPhoneUser = await User.findOne({ phoneNumber });
    if (existingPhoneUser) {
      return res.status(400).json({ message: "Số điện thoại đã được sử dụng" });
    }

    // Optional: Validate phone number format (example using regex)
    const phoneNumberRegex = /^[0-9]{10,15}$/; // Adjust regex as needed
    if (!phoneNumberRegex.test(phoneNumber)) {
      return res.status(400).json({ message: "Số điện thoại không hợp lệ" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 12);

    // Tạo người dùng mới
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phoneNumber,
    });
    await newUser.save();

    // Tạo token và thiết lập cookie
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        address: newUser.address,
        avatar: newUser.avatar,
        role: newUser.role,
      });
    } else {
      res.status(400).json({ error: "Lỗi tạo người dùng" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Tìm người dùng theo email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email không tồn tại" });
    }

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu không đúng" });
    }

    // Tạo token và thiết lập cookie
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
      avatar: user.avatar,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};
//////////////////
const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "Đăng xuất thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

export { signInUser, signUpUser, logoutUser, getAllUsers, getUser };
