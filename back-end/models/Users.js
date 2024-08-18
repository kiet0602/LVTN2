import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Email does not need to be unique
  },
  password: {
    type: String,
    required: false,
    default: "", // Default to an empty string
  },
  address: {
    street: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
  },
  phoneNumber: {
    type: String,
    required: false,
    unique: false, // Phone number does not need to be unique
  },
  role: {
    type: String,
    enum: ["customer", "admin", "vendor"],
    default: "customer",
  },
  avatar: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
