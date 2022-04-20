import { Types } from "../base/Models";
export interface IUser {
  phone: string;
  password: string;
  role: string;
  email: string;
  first_name?: string;
  last_name?: string;
  address?: string;
  avatar?: string;
  birthOfDate?: Date;
  sex?: boolean;
}

export interface IUserData extends IUser {
  _id: Types.ObjectId;
}

export interface IRePassword extends IUser {
  newPassword: string;
  rePassword: string;
}
