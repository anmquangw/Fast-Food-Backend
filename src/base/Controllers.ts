import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";

import { IUser } from "../interfaces";
import HttpStatus from "../configs/status";

interface IUserData extends IUser {
  _id: string;
}

type IAuthRequest = Request & {
  data: {
    token: string;
    user: IUserData;
    time: string;
  };
  time: string;
};

class BaseController {
  public success(
    res: Response,
    { data = null || 0, message = "", status = HttpStatus.OK, ...rest }: any
  ) {
    return res.status(status).json({ message, data, ...rest });
  }

  public failed(
    res: Response,
    { status = HttpStatus.INTERNAL_SERVER_ERROR, ...rest }: any
  ) {
    return res.status(status).json({
      ...rest,
    });
  }
}

export { Request, Response, NextFunction, ErrorRequestHandler };
export { BaseController, IAuthRequest, HttpStatus };
export default express;
