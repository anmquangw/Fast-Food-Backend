import mongoose, { Schema } from "../base/Models";
import { ISelect } from "../interfaces";
import Message from "../configs/messages";

const selectSchema = new mongoose.Schema<ISelect>({
  idUser: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, Message.NotInvalid],
  },
  idFood: {
    type: Schema.Types.ObjectId,
    ref: "Food",
    required: [true, Message.NotInvalid],
  },
  quantity: { type: Number, required: [true, Message.NotInvalid] },
});
selectSchema.index({ idUser: 1, idFood: 1 });

export default mongoose.model<ISelect>("Select", selectSchema);
