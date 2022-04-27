import { BaseController, Response, HttpStatus } from "../base/Controllers";
import { IOrder } from "../interfaces";
import {
  Order as OrderModel,
  OrderDetail as OrderDetailModel,
} from "../models";

function fromDate(date: Date = new Date(2000, 1, 1, 21, 0, 0)): Date {
  return new Date(date || new Date(2000, 1, 1, 21, 0, 0));
}
function toDate(date: Date = new Date()): Date {
  return new Date(date || new Date());
}

class Statistic extends BaseController {
  public async list(req: any, res: Response): Promise<any> {
    const from = fromDate(req.query?.from);
    const to = toDate(req.query?.to);

    OrderModel.find({ createdAt: { $gte: from, $lte: to } })
      .sort({ createdAt: -1 })
      .then(async (data: Array<IOrder>) => {
        const times = [
          ...new Set(
            data.map((item: any) => {
              const year = item.createdAt.getFullYear();
              const month = `0${item.createdAt.getMonth() + 1}`.slice(-2);
              const day = `0${item.createdAt.getDate()}`.slice(-2);
              return `${year}-${month}-${day}`;
            })
          ),
        ];

        const years: any = [
          ...new Set(times.map((item: any) => new Date(item).getFullYear())),
        ];
        const yearStatistic: any = [];
        years.forEach((item: any) => {
          yearStatistic.push({
            year: item,
            sum: 0,
            quantity: 0,
          });
        });

        const months: any = [
          ...new Set(
            times.map((item: any) => {
              const date = new Date(item);
              const year = date.getFullYear();
              const month = `0${date.getMonth() + 1}`.slice(-2);
              return `${year}-${month}`;
            })
          ),
        ];
        const monthStatistic: any = [];
        months.forEach((item: any) => {
          monthStatistic.push({
            month: item,
            sum: 0,
            quantity: 0,
          });
        });

        const dayStatistic: any = [];
        times.forEach((item: any) => {
          dayStatistic.push({
            day: item,
            sum: 0,
            quantity: 0,
          });
        });

        const orderDetailData = await OrderDetailModel.find();

        data.forEach((item: any) => {
          const createdAt = new Date(item.createdAt);
          const year = createdAt.getFullYear();
          const month = `${year}-${`0${createdAt.getMonth() + 1}`.slice(-2)}`;
          const day = `${month}-${("0" + createdAt.getDate()).slice(-2)}`;

          yearStatistic.forEach((yearItem: any) => {
            if (yearItem.year === year) {
              yearItem.sum += item.sum;
              const orderDetail = orderDetailData.filter(
                (orderDetailItem: any) =>
                  orderDetailItem.idOrder.toString() === item._id.toString()
              );
              let quantity = 0;
              orderDetail.forEach((orderDetailItem: any) => {
                quantity += orderDetailItem.quantity;
              });

              yearItem.quantity += quantity;
            }
          });

          monthStatistic.forEach((monthItem: any) => {
            if (monthItem.month === month) {
              monthItem.sum += item.sum;
              const orderDetail = orderDetailData.filter(
                (orderDetailItem: any) =>
                  orderDetailItem.idOrder.toString() === item._id.toString()
              );
              let quantity = 0;
              orderDetail.forEach((orderDetailItem: any) => {
                quantity += orderDetailItem.quantity;
              });

              monthItem.quantity += quantity;
            }
          });

          dayStatistic.forEach((dayItem: any) => {
            if (dayItem.day === day) {
              dayItem.sum += item.sum;
              const orderDetail = orderDetailData.filter(
                (orderDetailItem: any) =>
                  orderDetailItem.idOrder.toString() === item._id.toString()
              );
              let quantity = 0;
              orderDetail.forEach((orderDetailItem: any) => {
                quantity += orderDetailItem.quantity;
              });

              dayItem.quantity += quantity;
            }
          });
        });

        const result = {
          years: yearStatistic,
          months: monthStatistic,
          days: dayStatistic,
          times,
        };

        return super.success(res, {
          ...result,
          data,
        });
      })
      .catch((error: any) => {
        return super.failed(res, { error: error.message });
      });
  }

  public async detail(req: any, res: Response): Promise<any> {
    try {
      const ordersCount = await OrderModel.countDocuments({
        statusShip: "3",
      });
      const customersCount = (await OrderModel.distinct("idUser"))?.length;
      // const customersCount = await UserModel.countDocuments({
      //   role: "1",
      // });
      const ordersSum = await OrderModel.aggregate([
        {
          $group: {
            _id: null,
            sum: { $sum: "$sum" },
          },
        },
      ]);
      // const ordersQuantity = await OrderDetailModel.aggregate([
      //   {
      //     $group: {
      //       _id: null,
      //       quantity: { $sum: "$quantity" },
      //     },
      //   },
      // ]);
      return super.success(res, {
        data: { ordersCount, customersCount, ordersSum },
      });
    } catch (error: any) {
      return super.failed(res, { error: error.message });
    }
  }
}

export default new Statistic();
