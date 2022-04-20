import mongoose from "mongoose";
import { IFoodType } from "../interfaces";
import Message from "../configs/messages";

const foodTypeSchema = new mongoose.Schema<IFoodType>({
  name: { type: String, required: [true, Message.NotInvalid] },
  img: String,
});
foodTypeSchema.index({ name: 1 });

export default mongoose.model<IFoodType>("FoodType", foodTypeSchema);
