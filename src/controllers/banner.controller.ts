import { BaseController, Response, HttpStatus } from "../base/Controllers";
import { IBanner } from "../interfaces";
import { Banner as BannerModel } from "../models";

class Banner extends BaseController {
  public list(req: any, res: Response): any {
    BannerModel.find()
      .sort({ _id: -1 })
      .then((data: any) => {
        return super.success(res, { data });
      })
      .catch((error: any) => {
        return super.failed(res, { error: error.message });
      });
  }

  public detail(req: any, res: Response): any {
    const id: string = req.params.id;

    BannerModel.findById(id)
      .then((data: any) => {
        return super.success(res, { data });
      })
      .catch((error: any) => {
        return super.failed(res, { error: error.message });
      });
  }

  public create(req: any, res: Response): any {
    const body: IBanner = req.body;

    new BannerModel(body)
      .save()
      .then((data: any) => {
        return super.success(res, { data, status: HttpStatus.CREATED });
      })
      .catch((error: any) => {
        return super.failed(res, { error: error.message });
      });
  }

  public update(req: any, res: Response): any {
    const body: IBanner = req.body;
    const id: string = req.params.id;

    BannerModel.findByIdAndUpdate(
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

    BannerModel.findByIdAndRemove(id)
      .then((data: any) => {
        return super.success(res, { data });
      })
      .catch((error: any) => {
        return super.failed(res, { error: error.message });
      });
  }
}

export default new Banner();
