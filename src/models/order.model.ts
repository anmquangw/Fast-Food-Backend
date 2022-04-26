import mongoose, { Types, Schema } from "mongoose";
import { IOrder } from "../interfaces";
import Message from "../configs/messages";

const orderSchema = new mongoose.Schema<IOrder>(
  {
    idUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, Message.NotInvalid],
    },
    sum: { type: Number, required: [true, Message.NotInvalid] },
    address: { type: String, required: [true, Message.NotInvalid] },
    name: { type: String, required: [true, Message.NotInvalid] },
    status: {
      type: String,
      required: [true, Message.NotInvalid],
      default: "0",
      enum: ["0", "1"],
    },
    idPayment: {
      type: Schema.Types.ObjectId,
    },
    note: String,
    statusShip: {
      type: String,
      required: [true, Message.NotInvalid],
      default: "0",
      enum: ["0", "1", "2", "3", "4"],
    },
  },
  {
    timestamps: true,
  }
);
orderSchema.index({ idUser: 1, status: 1, createdAt: -1 });

export default mongoose.model<IOrder>("Order", orderSchema);
