import mongoose, { Types, Schema } from "mongoose";
import { IOrderDetail } from "../interfaces";
import Message from "../configs/messages";

const orderDetailSchema = new mongoose.Schema<IOrderDetail>({
  idOrder: {
    type: Schema.Types.ObjectId,
    ref: "Order",
    required: [true, Message.NotInvalid],
  },
  idFood: {
    type: Schema.Types.ObjectId,
    ref: "Food",
    required: [true, Message.NotInvalid],
  },
  quantity: { type: Number, required: true },
});
orderDetailSchema.index({ idOrder: 1, idFood: 1 });

export default mongoose.model<IOrderDetail>("OrderDetail", orderDetailSchema);
