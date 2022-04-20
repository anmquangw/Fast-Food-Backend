import { BaseController, Response, HttpStatus, ErrorRequestHandler } from "../base/Controllers";

import { IUser, IUserData, IRePassword } from "../interfaces";
import { User as UserModel } from "../models";

import token from "../common/token";
import messages from "../configs/messages";

class User extends BaseController {
  public list(req: any, res: Response): any {
    UserModel.find()
      .then((data: any) => {
        return super.success(res, { data });
      })
      .catch((error: any) => {
        return super.failed(res, { error });
      });
  }

  public signup(req: any, res: Response): any {
    const body: IUser = req.body;

    new UserModel(body)
      .save()
      .then((data: any) => {
        return super.success(res, {
          data: data.toObject(),
          token: token.generate(data),
          status: HttpStatus.CREATED,
        });
      })
      .catch((error: any) => {
        return super.failed(res, { error });
      });
  }

  public signin(req: any, res: Response): any {
    const { phone, password }: IUser = req.body;

    UserModel.findOne({ phone })
      .then((data: any) => {
        if (!data)
          return super.failed(res, {
            error: messages.UserNotFound,
            status: HttpStatus.NOT_FOUND,
          });

        if (data.comparePassword(password)) {
          if (data.role === "2")
            return super.failed(res, {
              error: messages.LockAccount,
              status: HttpStatus.LOCKED,
            });
          return super.success(res, {
            data: data.toObject(),
            token: token.generate(data),
          });
        }

        return super.failed(res, {
          error: messages.WrongPassword,
          status: HttpStatus.UNAUTHORIZED,
        });
      })
      .catch((error: any) => {
        return super.failed(res, { error });
      });
  }

  public updateStatus(req: any, res: Response): any {
    const { role }: IUser = req.body;
    const id: string = req.params.id;

    UserModel.findByIdAndUpdate(
      id,
      [
        {
          $set: { role },
        },
      ],
      { new: true }
    )
      .then((data: any) => {
        if (!data)
          return super.failed(res, {
            error: {
              errors: [messages.UserNotFound],
            },
            status: HttpStatus.NOT_FOUND,
          });

        return super.success(res, {
          data: data.toObject(),
        });
      })
      .catch((error: any) => {
        return super.failed(res, { error: error.message });
      });
  }

  public async resetPassword(req: any, res: Response): Promise<any> {
    const userInfo: IUserData = res.locals.payload;
    const id = userInfo._id;
    const { password, newPassword, rePassword }: IRePassword = req.body;
    
    try {
      if (password !== rePassword)
        return super.failed(res, {
          error: {
            errors: [messages.PasswordNotMatch],
          },
          status: HttpStatus.BAD_REQUEST,
        });

      UserModel.findByIdAndUpdate(
        id,
        [
          {
            $set: { role: "2" },
          },
        ],
        { new: true }
      )
        .then((data: any) => {
          if (!data)
            return super.failed(res, {
              error: {
                errors: [messages.UserNotFound],
              },
              status: HttpStatus.NOT_FOUND,
            });

          return super.success(res, {
            data: data.toObject(),
          });
        })
        .catch((error: any) => {
          return super.failed(res, { error: error.message });
        });
    } catch (error: any) {
      return super.failed(res, { error: error.message });
    }
  }

  public remove(req: any, res: Response): any {
    const id: string = req.params.id;

    UserModel.findByIdAndUpdate(
      id,
      [
        {
          $set: { role: "2" },
        },
      ],
      { new: true }
    )
      .then((data: any) => {
        if (!data)
          return super.failed(res, {
            error: {
              errors: [messages.UserNotFound],
            },
            status: HttpStatus.NOT_FOUND,
          });

        return super.success(res, {
          data: data.toObject(),
        });
      })
      .catch((error: any) => {
        return super.failed(res, { error: error.message });
      });
  }
}
export default new User();
