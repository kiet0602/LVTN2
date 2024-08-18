import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h", // Thay đổi thời gian hết hạn nếu cần
  });

  res.cookie("jwt", token, {
    httpOnly: true, // Không cho phép JavaScript truy cập cookie
    secure: process.env.NODE_ENV === "production", // Chỉ sử dụng HTTPS trong môi trường sản xuất
  });
};

export default generateTokenAndSetCookie;
