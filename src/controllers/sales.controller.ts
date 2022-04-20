import { BaseController, Response, HttpStatus } from "../base/Controllers";
import { ISales } from "../interfaces";
import { Sales as SalesModel } from "../models";

class Sales extends BaseController {
  public list(req: any, res: Response): any {
    SalesModel.find()
      .sort({ _id: -1 })
      .then((data: any) => {
        return super.success(res, { data });
      })
      .catch((error: any) => {
        return super.failed(res, { error });
      });
  }

  public getDetail(req: any, res: Response): any {
    const id = req.params.id;
    SalesModel.findById(id)
      .then((data: any) => {
        return super.success(res, { data });
      })
      .catch((error: any) => {
        return super.failed(res, { error });
      });
  }

  public checkCode(req: any, res: Response): any {
    const code: any = unescape(req.query.code);

    SalesModel.find({ code })
      .then((data: any) => {
        return super.success(res, { data: !data.length ? false : true });
      })
      .catch((error: any) => {
        return super.failed(res, { error });
      });
  }

  public create(req: any, res: Response): any {
    const body: ISales = req.body;

    new SalesModel(body)
      .save()
      .then((data: any) => {
        return super.success(res, { data, status: HttpStatus.CREATED });
      })
      .catch((error: any) => {
        return super.failed(res, { error });
      });
  }

  public update(req: any, res: Response): any {
    const body: ISales = req.body;
    const id: string = req.params.id;

    SalesModel.findByIdAndUpdate(
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

  public remove(req: any, res: Response): any {
    const id: string = req.params.id;

    SalesModel.findByIdAndRemove(id)
      .then((data: any) => {
        return super.success(res, { data });
      })
      .catch((error: any) => {
        return super.failed(res, { error });
      });
  }
}

export default new Sales();
