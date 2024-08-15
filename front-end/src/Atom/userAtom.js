import { atom } from "recoil";

export const userAtom = atom({
  key: "userAtom", // Key phải là duy nhất trong toàn bộ ứng dụng
  default: null, // Giá trị mặc định là null, chưa có người dùng đăng nhập
});
