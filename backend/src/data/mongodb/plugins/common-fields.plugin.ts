import { Schema } from "mongoose";

export const commonFieldsPlugin = (schema: Schema) => {
  // Add the fields to the schema
  schema.add({
    status: {
      type: String,
      default: "ACTIVE",
      enum: ["ACTIVE", "INACTIVE", "DELETED"],
    },
    creationDate: {
      type: Date,
      default: new Date(),
    },
  });
};
