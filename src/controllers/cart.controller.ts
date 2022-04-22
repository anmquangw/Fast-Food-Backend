import { BaseController, Response, HttpStatus } from "../base/Controllers";
import { ISelect, IUserData } from "../interfaces";
import { Select as SelectModel, Food as FoodModel } from "../models";

class Cart extends BaseController {
  public async list(req: any, res: Response): Promise<any> {
    const userInfo: IUserData = res.locals.payload;
    const idUser = userInfo._id;

    SelectModel.find({ idUser })
      .then(async (data: any) => {
        const foodIds: any = data.map((item: any) => item.idFood);
        const foodList: any = await Promise.all(
          (
            await FoodModel.find({
              _id: { $in: foodIds },
            }).exec()
          ).map(async (food: any) => {
            const info = await food.toObject();
            return {
              idFood: info._id,
              name: info.name,
              quantityInStock: info.quantity,
              price: info.price,
              img1: info.img1,
            };
          })
        );

        data = data.map((item: any) => ({
          ...item._doc,
          ...foodList.find(
            (food: any) => food?.idFood?.toString() === item?.idFood?.toString()
          ),
        }));

        return super.success(res, {
          data,
        });
      })
      .catch((error: any) => {
        console.log(error);
        return super.failed(res, { error });
      });
  }

  public async add(req: any, res: Response): Promise<any> {
    const userInfo: IUserData = res.locals.payload;
    const idUser = userInfo._id;
    const body: ISelect = <ISelect>req.body;

    if (!body.idFood) return super.failed(res, { error: "idFood is required" });
    
    const oldData = await SelectModel.findOne({ idUser, idFood: body.idFood });
    if (oldData) body.quantity += oldData.quantity;

    SelectModel.findOneAndUpdate(
      { idUser, idFood: body.idFood },
      { $set: { quantity: body.quantity } },
      { upsert: true, new: true }
    )
      .select("-idUser")
      .then((data: any) => {
        return super.success(res, { data });
      })
      .catch((error: any) => {
        return super.failed(res, { error });
      });
  }

  public async update(req: any, res: Response): Promise<any> {
    const userInfo: IUserData = res.locals.payload;
    const idUser = userInfo._id;
    const _id = req.params.id;
    const body: ISelect = req.body;

    SelectModel.findOneAndUpdate(
      { idUser, _id },
      [
        {
          $set: { quantity: body.quantity },
        },
      ],
      { upsert: true, new: true }
    )
      .then((data: any) => {
        if (data.quantity <= 0) data.delete();

        return super.success(res, { data });
      })
      .catch((error: any) => {
        console.log(error);
        return super.failed(res, { error });
      });
  }

  public remove(req: any, res: Response): any {
    const userInfo: IUserData = res.locals.payload;
    const idUser = userInfo._id;

    const idFood = req.params.id;

    SelectModel.findOneAndRemove({ idUser, idFood })
      .then((data: any) => {
        return super.success(res, { data });
      })
      .catch((error: any) => {
        return super.failed(res, { error });
      });
  }
}

export default new Cart();
