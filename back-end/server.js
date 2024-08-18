import express from "express"; //1
import dotenv from "dotenv"; //5
import connectDB from "./db/connectDB.js"; //7
import userRoutes from "./Routes/userRoutes.js"; //9
import cookieParser from "cookie-parser"; //11
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import cors from "cors";

import google from "./Routes/Google.js";
import facebook from "./Routes/Facebook.js";

import configLoginWithGoogle from "./controller/socical/Google.js";
import configLoginWithFacebook from "./controller/socical/Facebook.js";

dotenv.config(); //6

const app = express(); //2
const PORT = process.env.PORT || 5000; //3

connectDB(); //8 - Connect to the database after app initialization

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" })); // Tăng giới hạn kích thước của JSON //13
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); // 14 Tăng giới hạn kích thước của URL-encoded data

// Middleware để phân tích dữ liệu JSON
app.use(express.json()); //15
app.use(express.urlencoded({ extended: true })); //16

// Phân tích cookie
app.use(cookieParser()); //17

// Sử dụng các routes từ userRoutes
app.use("/api/users", userRoutes); //10

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
configLoginWithGoogle();
configLoginWithFacebook();
app.use("/", facebook);
app.use("/", google);
//app.use("/", paypal);

// Bắt đầu server
app.listen(
  PORT,
  () => console.log(`Server listening on http://localhost:${PORT}`) //4
);
