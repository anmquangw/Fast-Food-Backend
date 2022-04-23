import { BaseController, Response, HttpStatus } from "../base/Controllers";
import {
  Food as FoodModel,
  Select as SelectModel,
  Order as OrderModel,
  OrderDetail as OrderDetailModel,
} from "../models";

import { IUserData, IOrder, IOrderStatus, ISelect } from "../interfaces";
import messages from "../configs/messages";

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

      const data = orders.map((item: any) => {
        const orderDetail = orderDetails.filter(
          (od) => od?.idOrder?.toString() === item?._id?.toString()
        );
        return { ...item._doc, orderDetail };
      });

      return super.success(res, { data });
    } catch (error) {
      console.log(error);
      return super.failed(res, { error });
    }
  }

  public async getDetail(req: any, res: Response): Promise<any> {
    const id = req.params.id;

    try {
      const data = await OrderDetailModel.find({ idOrder: id });
      return super.success(res, {
        data,
      });
    } catch (error) {
      return super.failed(res, {
        error: <String>error,
      });
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

      const food = await FoodModel.find();
      const cart = await SelectModel.find({ idUser });

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

  public updateStatus(req: any, res: Response): any {
    const body: IOrderStatus = req.body;
    const id: string = req.params.id;

    OrderModel.findByIdAndUpdate(
      id,
      [
        {
          $set: body,
        },
      ],
      { new: true }
    )
      .then((data: any) => {
        return super.success(res, { data });
      })
      .catch((error: any) => {
        return super.failed(res, { error });
      });
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
