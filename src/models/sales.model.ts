import mongoose from "../base/Models";
import { ISales } from "../interfaces";
import Message from "../configs/messages";

const salesSchema = new mongoose.Schema<ISales>({
  code: { type: String, required: [true, Message.NotInvalid] },
  quantity: { type: Number, required: [true, Message.NotInvalid] },
  description: String,
  img: String,
});
salesSchema.index({ code: 1 });

export default mongoose.model<ISales>("Sales", salesSchema);
