import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import userRoutes from "./Routes/userRoutes.js";
import UserFacebook from "./Routes/UserFacebook.js";
import UserGoogle from "./Routes/UserGoogle.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";
import session from "express-session";

import configLoginWithGoogle from "./controller/socical/Google.js";
import configLoginWithFacebook from "./controller/socical/Facebook.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(
  cors({
    origin: "http://localhost:4000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Cấu hình session
app.use(
  session({
    secret: "your-session-secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Đặt thành `true` nếu sử dụng HTTPS
  })
);

app.use(passport.initialize());
app.use(passport.session());
configLoginWithGoogle();
configLoginWithFacebook();

app.use("/api/users", userRoutes);

app.use("/", UserFacebook);
app.use("/", UserGoogle);

app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
