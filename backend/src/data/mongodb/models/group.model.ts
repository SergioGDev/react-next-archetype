import mongoose, { Schema } from "mongoose";
import { commonFieldsPlugin } from "../plugins/common-fields.plugin";

const groupSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  description: {
    type: String,
  },
  creatorId: {
    type: String,
    required: [true, "Creator email is required"]
  }
});

export const GroupModel = mongoose.model(
  "Group",
  groupSchema.plugin(commonFieldsPlugin)
);
