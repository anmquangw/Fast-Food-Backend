import { Types } from "../base/Models";

export interface ISelect {
  idUser: Types.ObjectId;
  idFood: Types.ObjectId;
  quantity: number;
}
