import { model, models, Schema } from "mongoose";

const PeopleSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

export const People = models?.People || model("People", PeopleSchema);
