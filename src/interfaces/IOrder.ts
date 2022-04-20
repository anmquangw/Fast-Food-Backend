import { Types } from "../base/Models";

export interface IOrderStatus {
  status?: string;
  statusShip?: string;
}

export interface IOrder extends IOrderStatus {
  idUser: Types.ObjectId;
  sum?: number;
  address: string;
  name: string;
  status?: string;
  idPayment?: Types.ObjectId;
  note?: string;
  // createdAt: Date;
}
