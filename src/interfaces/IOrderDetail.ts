import { Types } from "../base/Models";

export interface IOrderDetail {
  idOrder: Types.ObjectId;
  idFood: Types.ObjectId;
  quantity: number;
}
