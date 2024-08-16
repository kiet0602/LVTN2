import jwt from "jsonwebtoken";

/**
 * Tạo token JWT và thiết lập cookie trong phản hồi.
 * @param {string} userId - ID của người dùng để tạo token.
 * @param {Object} res - Đối tượng phản hồi từ Express để thiết lập cookie.
 * @returns {string} token - Token JWT được tạo ra.
 */
const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d", // Thời gian hết hạn của token
  });

  res.cookie("jwt", token, {
    httpOnly: true, // Chỉ có thể truy cập cookie từ phía máy chủ
    maxAge: 15 * 24 * 60 * 60 * 1000, // Thời gian hết hạn của cookie (15 ngày)
    sameSite: "Strict", // Chỉ gửi cookie cùng với các yêu cầu đến cùng miền
    secure: process.env.NODE_ENV === "production", // Chỉ gửi cookie qua HTTPS nếu đang chạy ở môi trường sản xuất
  });

  return token;
};

export default generateTokenAndSetCookie;
