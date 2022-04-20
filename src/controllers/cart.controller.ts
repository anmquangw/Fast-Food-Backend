import { BaseController, Response, HttpStatus } from "../base/Controllers";
import { ISelect, IUserData } from "../interfaces";
import { Select as SelectModel } from "../models";

class Cart extends BaseController {
  public list(req: any, res: Response): any {
    const userInfo: IUserData = res.locals.payload;
    const idUser = userInfo._id;

    SelectModel.find({ idUser })
      .then((data: any) => {
        return super.success(res, {
          data,
        });
      })
      .catch((error: any) => {
        return super.failed(res, { error });
      });
  }

  public async add(req: any, res: Response): Promise<any> {
    const userInfo: IUserData = res.locals.payload;
    const idUser = userInfo._id;
    const body: ISelect = req.body;

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

    // new SelectModel({ ...body, idUser })
    //   .save()
    //   .then((data: any) => {
    //     return super.success(res, {
    //       data,
    //     });
    //   })
    //   .catch((error: any) => {
    //     return super.failed(res, { error });
    //   });
  }

  public async update(req: any, res: Response): Promise<any> {
    const userInfo: IUserData = res.locals.payload;
    const idUser = userInfo._id;
    const idFood = req.params.id;
    const body: ISelect = req.body;
    const oldData = await SelectModel.findOne({ idUser, idFood });
    if (oldData) body.quantity += oldData.quantity;

    SelectModel.findOneAndUpdate(
      { idUser, idFood },
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
