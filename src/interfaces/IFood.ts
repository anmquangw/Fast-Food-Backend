import { Types } from "../base/Models";

export interface IFood {
  name: string;
  idFoodType: Types.ObjectId;
  price: number;
  quantity: number;
  description?: string;
  img1?: string;
  img2?: string;
  img3?: string;
  img4?: string;
  img5?: string;
}
