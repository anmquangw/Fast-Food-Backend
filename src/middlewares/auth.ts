import { IUser } from "../interfaces";
import { User as UserModel } from "../models";

import { Token } from "../common/token";
import { Response, NextFunction } from "../base/Controllers";
import { BaseController, HttpStatus } from "../base/Controllers";
import messages from "../configs/messages";

const apiResponse = new BaseController();

class Auth extends Token {
  public async isLoggerIn(
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const token = super.getToken(req);
    if (!token)
      return apiResponse.failed(res, {
        status: HttpStatus.UNAUTHORIZED,
        message: messages.TokenNotValid,
      });

    try {
      const veryfied: any = super.verify(token);
      res.locals.payload = await UserModel.findById(veryfied._doc._id);
    } catch (error: any) {
      return apiResponse.failed(res, {
        status: HttpStatus.UNAUTHORIZED,
        error,
      });
    }
    return next();
  }

  public async isAdmin(req: any, res: Response, next: NextFunction) {
    const userInfo: IUser = res.locals.payload;

    UserModel.findOne(userInfo, (error: any, data: IUser) => {
      if (error)
        return apiResponse.failed(res, {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: messages.NotFound,
        });

      if (data.role === "0") return next();
      return apiResponse.failed(res, {
        status: HttpStatus.UNAUTHORIZED,
        error: messages.Unauthorized,
      });
    });
  }
}

export default new Auth();
