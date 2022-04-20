import mongoose from "mongoose";
import { IBanner } from "../interfaces";
import Message from "../configs/messages";

const bannerSchema = new mongoose.Schema<IBanner>({
  name: {
    type: String,
    required: [true, Message.NotInvalid],
  },
  image: String,
});
bannerSchema.index({ name: 1 });

export default mongoose.model<IBanner>("Banner", bannerSchema);
