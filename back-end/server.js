import express from "express"; //1
import dotenv from "dotenv"; //5
import connectDB from "./db/connectDB.js"; //7
import userRoutes from "./Routes/userRoutes.js"; //9
import cookieParser from "cookie-parser"; //11
import bodyParser from "body-parser"; //12

dotenv.config(); //6
// Không cần gọi Clerk.configure vì @clerk/clerk-sdk-node không có phương thức này

connectDB(); //8

const app = express(); //2
const PORT = process.env.PORT || 5000; //3

app.use(bodyParser.json({ limit: "50mb" })); // Tăng giới hạn kích thước của JSON //13
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); // 14 Tăng giới hạn kích thước của URL-encoded data

// Middleware để phân tích dữ liệu JSON
app.use(express.json()); //15
app.use(express.urlencoded({ extended: true })); //16

// Phân tích cookie
app.use(cookieParser()); //17

// Sử dụng các routes từ userRoutes
app.use("/api/users", userRoutes); //10

// Bắt đầu server
app.listen(
  PORT,
  () => console.log(`Server listening on http://localhost:${PORT}`) //4
);
