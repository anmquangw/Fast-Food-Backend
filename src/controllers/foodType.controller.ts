import { BaseController, Response, HttpStatus } from "../base/Controllers";
import { IFoodType } from "../interfaces";
import { FoodType as FoodTypeModel } from "../models";

class FoodType extends BaseController {
  public list(req: any, res: Response): any {
    FoodTypeModel.find()
      .then((data: any) => {
        return super.success(res, { data });
      })
      .catch((error: any) => {
        return super.failed(res, { error: error.message });
      });
  }

  public detail(req: any, res: Response): any {
    const id: string = req.params.id;

    FoodTypeModel.findById(id)
      .then((data: any) => {
        return super.success(res, { data });
      })
      .catch((error: any) => {
        return super.failed(res, { error: error.message });
      });
  }

  public create(req: any, res: Response): any {
    const body: IFoodType = req.body;

    new FoodTypeModel(body)
      .save()
      .then((data: any) => {
        return super.success(res, { data, status: HttpStatus.CREATED });
      })
      .catch((error: any) => {
        return super.failed(res, { error: error.message });
      });
  }

  public update(req: any, res: Response): any {
    const body: IFoodType = req.body;
    const id: string = req.params.id;

    FoodTypeModel.findByIdAndUpdate(
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
        return super.failed(res, { error: error.message });
      });
  }

  public remove(req: any, res: Response): any {
    const id: string = req.params.id;

    FoodTypeModel.findByIdAndRemove(id)
      .then((data: any) => {
        return super.success(res, { data });
      })
      .catch((error: any) => {
        return super.failed(res, { error: error.message });
      });
  }
}

export default new FoodType();
