import mongoose, { Schema } from "mongoose";
import { commonFieldsPlugin } from "../plugins/common-fields.plugin";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  surname: {
    type: String,
    required: [true, "Surname is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  idGroup: {
    type: String,
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    default: "USER_ROLE",
    enum: ["USER_ROLE", "COORDINATOR_ROLE", "ADMIN_ROLE"],
  },
});

export const UserModel = mongoose.model(
  "User",
  userSchema.plugin(commonFieldsPlugin)
);
