import express from "express"; //1

import protectRoute from "../middlewares/protectRoute.js"; //2
import {
  logoutUser,
  signUpUser,
  signInUser,
  getAllUsers,
  getUser,
} from "../controller/userController.js"; //3

const router = express.Router(); //4

router.post("/login", signInUser); //6
router.post("/register", signUpUser); //7
router.post("/logout", protectRoute, logoutUser); //8

router.get("/getAllUsers", getAllUsers); //9
router.get("/getUser/:id", getUser); //10

export default router; //5
