import { BaseController, Response, HttpStatus } from "../base/Controllers";
import {
  Food as FoodModel,
  Select as SelectModel,
  Order as OrderModel,
  OrderDetail as OrderDetailModel,
  User as UserModel,
} from "../models";

import { IUserData, IOrder, IOrderStatus, ISelect } from "../interfaces";
import messages from "../configs/messages";
import { Console } from "console";

class Order extends BaseController {
  public async list(req: any, res: Response): Promise<any> {
    const userInfo: IUserData = res.locals.payload;
    const idUser = userInfo._id;
    const userRole = userInfo.role;
    const query = userRole == "0" ? {} : { idUser };
    try {
      const orders = await OrderModel.find(query);

      const orderIds = orders.map((item: any) => item._id);
      const orderDetails = await OrderDetailModel.find({
        idOrder: { $in: orderIds },
      });

      const foodIds = orderDetails.map((item: any) => item.idFood);
      var foods = (await FoodModel.find({ _id: { $in: foodIds } })).map(
        (item: any) => {
          return {
            ...item._doc,
            price: item.price.toString(),
          };
        }
      );

      const data = orders.map((item: any) => {
        const orderDetailc = orderDetails.filter(
          (od) => od?.idOrder?.toString() === item?._id?.toString()
        );
        const orderDetail = orderDetailc.map((od: any) => {
          const food = foods.find(
            (f) => f._id.toString() === od.idFood.toString()
          );
          return {
            ...od._doc,
            ...{ name: food.name, price: food.price, img1: food.img1 },
          };
        });

        return { ...item._doc, orderDetail };
      });

      return super.success(res, { data });
    } catch (error) {
      console.log(error);
      return super.failed(res, { error });
    }
  }

  public async listWithUser(req: any, res: Response): Promise<any> {
    const userInfo: IUserData = res.locals.payload;
    const idUser = userInfo._id;
    const userRole = userInfo.role;
    const query = userRole == "0" ? {} : { idUser };
    try {
      const orders = await OrderModel.find(query);
      const userIds = orders.map((item: any) => item.idUser);
      const users = await UserModel.find({ _id: { $in: userIds } }).select(
        "-password"
      );
      const data = orders.map((item: any) => {
        const user: any = users.find(
          (u) => u?._id?.toString() === item?.idUser?.toString()
        );
        return {
          ...item._doc,
          ...user._doc,
        };
      });

      return super.success(res, { data });
    } catch (error) {
      console.log(error);
      return super.failed(res, { error });
    }
  }

  public async getDetail(req: any, res: Response): Promise<any> {
    const id = req.params.id;
    const userInfo: IUserData = res.locals.payload;
    const idUser = userInfo._id;
    const userRole = userInfo.role;
    const query = userRole == "0" ? {} : { idUser };
    try {
      const order: any = await OrderModel.findOne({ ...query, _id: id });

      const orderDetails: any = await OrderDetailModel.find({
        idOrder: id,
      });
      const foodIds = orderDetails.map((item: any) => item.idFood);
      var foods = (await FoodModel.find({ _id: { $in: foodIds } })).map(
        (item: any) => {
          return {
            ...item._doc,
            price: item.price.toString(),
          };
        }
      );
      const orderDetail = orderDetails.map((od: any) => {
        const food = foods.find(
          (f) => f._id.toString() === od.idFood.toString()
        );
        return {
          ...od._doc,
          ...{ name: food.name, price: food.price, img1: food.img1 },
        };
      });

      return super.success(res, { data: { ...order._doc, orderDetail } });
    } catch (error) {
      console.log(error);
      return super.failed(res, { error });
    }
  }

  public async create(req: any, res: Response): Promise<any> {
    const userInfo: IUserData = res.locals.payload;
    const body: IOrder = req.body;
    const idUser = userInfo._id;

    try {
      const sumQty = await SelectModel.aggregate([
        {
          $group: {
            _id: "$idUser",
            total: {
              $sum: "$quantity",
            },
          },
        },
      ]);

      if (sumQty.length <= 0)
        return super.failed(res, {
          error: messages.ThereIsNoProductInCart,
          status: HttpStatus.BAD_REQUEST,
        });

      const cart = await SelectModel.find({ idUser });

      const foodIds = cart.map((item: any) => item.idFood);
      const food = await FoodModel.find({ _id: { $in: foodIds } });

      await cart.map(async (item: ISelect) => {
        await FoodModel.findByIdAndUpdate(
          item.idFood,
          {
            $inc: {
              quantity: -item.quantity,
            },
          },
          { new: true }
        );
      });

      body.sum = cart.reduce((acc, cur) => {
        return (acc +=
          cur.quantity *
          (food.find((f) => f._id.toString() === cur.idFood.toString())
            ?.price || 0));
      }, 0);

      body.idUser = idUser;

      const order = await OrderModel.create({ ...body });
      const orderDetail = await OrderDetailModel.insertMany(
        cart.map((c) => ({
          idOrder: order._id,
          idFood: c.idFood,
          quantity: c.quantity,
        }))
      );

      await SelectModel.deleteMany({ idUser });

      return super.success(res, { data: { order, add: sumQty, orderDetail } });
    } catch (error) {
      return super.failed(res, { error });
    }
  }

  public async updateStatus(req: any, res: Response): Promise<any> {
    const body: IOrderStatus = req.body;
    const id: string = req.params.id;
    try {
      const order: any = await OrderModel.findByIdAndUpdate(
        id,
        [
          {
            $set: body,
          },
        ],
        { new: true }
      );
      const orderDetails: any = await OrderDetailModel.find({
        idOrder: id,
      });
      const foodIds = orderDetails.map((item: any) => item.idFood);
      var foods = (await FoodModel.find({ _id: { $in: foodIds } })).map(
        (item: any) => {
          return {
            ...item._doc,
            price: item.price.toString(),
          };
        }
      );
      const orderDetail = orderDetails.map((od: any) => {
        const food = foods.find(
          (f) => f._id.toString() === od.idFood.toString()
        );
        return {
          ...od._doc,
          ...{ name: food.name, price: food.price, img1: food.img1 },
        };
      });
      return super.success(res, { data: { ...order._doc, orderDetail } });
    } catch (error) {
      return super.failed(res, { error });
    }
  }

  public async remove(req: any, res: Response): Promise<any> {
    const id: string = req.params.id;

    const orderDetail = await OrderDetailModel.find({ idOrder: id });

    await orderDetail.map(async (item: any) => {
      await FoodModel.findByIdAndUpdate(
        item.idFood,
        {
          $inc: {
            quantity: item.quantity,
          },
        },
        { new: true }
      );
    });

    OrderDetailModel.deleteMany({ idOrder: id })
      .then(() => {
        OrderModel.findByIdAndRemove(id)
          .then((data: any) => {
            return super.success(res, { data });
          })
          .catch((error: any) => {
            throw new Error(error);
          });
      })
      .catch((error) => {
        return super.failed(res, { error });
      });
  }
}

export default new Order();
