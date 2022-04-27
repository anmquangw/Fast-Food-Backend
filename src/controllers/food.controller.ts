import { BaseController, Response, HttpStatus } from "../base/Controllers";
import { Food as FoodModel } from "../models";

class User extends BaseController {
  public async list(req: any, res: Response): Promise<any> {
    const query: Object = req.query;

    FoodModel.find(query)
      .sort({ _id: -1 })
      .then(async (data: any) => {
        const result = data.map(async (food: any) => await food.toObject());

        return super.success(res, {
          data: await Promise.all(result),
        });
      })
      .catch((error: any) => {
        return super.failed(res, { error: error.message });
      });
  }

  public async detail(req: any, res: Response): Promise<any> {
    const id: string = req.params.id;

    FoodModel.findById(id)
      .sort({ _id: -1 })
      .then(async (data: any) => {
        const result = await data.toObject();

        return super.success(res, {
          data: result,
        });
      })
      .catch((error: any) => {
        return super.failed(res, { error: error.message });
      });
  }

  public async listByOrderRate(req: any, res: Response): Promise<any> {
    FoodModel.find({})
      .then(async (data: any) => {
        const result = data.map(async (food: any) => await food.toObject());

        return super.success(res, {
          data: (await Promise.all(result)).sort((a, b) => b.sell - a.sell),
        });
      })
      .catch((error: any) => {
        return super.failed(res, { error: error.message });
      });
  }

  public create(req: any, res: Response): any {
    const body: Object = req.body;

    new FoodModel(body)
      .save()
      .then((data: any) => {
        return super.success(res, { data, status: HttpStatus.CREATED });
      })
      .catch((error: any) => {
        return super.failed(res, { error: error.message });
      });
  }

  public update(req: any, res: Response): any {
    const body: Object = req.body;
    const id: string = req.params.id;

    FoodModel.findByIdAndUpdate(
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

    FoodModel.findByIdAndRemove(id, { useFindAndModify: false, new: true })
      .then((data: any) => {
        return super.success(res, { data });
      })
      .catch((error: any) => {
        return super.failed(res, { error: error.message });
      });
  }
}

export default new User();
