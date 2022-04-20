import mongoose, { Types, Schema } from "mongoose";
import { OrderDetail as OrderDetailModel } from ".";
import { FoodType as FoodTypeModel } from ".";
import { IFood } from "../interfaces";
import Message from "../configs/messages";

const foodSchema = new mongoose.Schema<IFood>({
  name: {
    type: String,
    required: [true, Message.NotInvalid],
  },
  idFoodType: {
    type: Schema.Types.ObjectId,
    ref: "FoodType",
    required: [true, Message.NotInvalid],
  },
  price: {
    type: Number,
    required: [true, Message.NotInvalid],
  },
  quantity: {
    type: Number,
    required: [true, Message.NotInvalid],
  },
  description: String,
  img1: String,
  img2: String,
  img3: String,
  img4: String,
  img5: String,
});
foodSchema.index({ name: 1 });

foodSchema.set("toObject", {
  transform: async (doc, ret) => {
    ret.sell = await OrderDetailModel.countDocuments({
      idFood: ret._id,
    }).exec();
    const foodType: any = await FoodTypeModel.findById(ret.idFoodType).exec();
    ret.foodType = foodType.name;
    return ret;
  },
});

export default mongoose.model<IFood>("Food", foodSchema);
