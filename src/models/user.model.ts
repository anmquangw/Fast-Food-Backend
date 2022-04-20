import mongoose from "mongoose";

import { IUser } from "../interfaces";
import hashPassword from "../common/hashPassword";
import Message from "../configs/messages";

const userSchema = new mongoose.Schema<IUser>(
  {
    phone: {
      type: String,
      required: [true, Message.NotInvalid],
      unique: true,
    },
    password: {
      type: String,
      required: [true, Message.NotInvalid],
    },
    role: {
      type: String,
      required: [true, Message.NotInvalid],
      enum: ["0", "1", "2"],
      default: "1",
    },
    email: {
      type: String,
      required: [true, Message.NotInvalid],
      unique: true,
    },
    first_name: String,
    last_name: String,
    address: String,
    avatar: String,
    birthOfDate: Date,
    sex: Boolean,
  },
  {
    timestamps: true,
  }
);
userSchema.index({ phone: 1, email: 1, role: 1 });

userSchema.pre("save", function (next) {
  const user = this as IUser;
  user.password = hashPassword.hash(user.password);
  return next();
});

userSchema.methods.comparePassword = function (
  candidatePassword: string,
  cb: any
) {
  const user = this as IUser;
  return hashPassword.compare(candidatePassword, user.password);
};

userSchema.set("toObject", {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model<IUser>("User", userSchema);
