import jwt from "jsonwebtoken";
import { Request, IAuthRequest } from "../base/Controllers";
import env from "../configs/env";

const secret = env.SECRET_KEY;
const expiresIn = env.EXPIRES_IN;

class Token {

  public decode(token: string): any {
    return jwt.decode(token);
  }

  public generate(payload: any): string {
    return jwt.sign({ ...payload }, secret, { expiresIn: expiresIn });
  }

  public verify(token: string): any {
    return jwt.verify(token, secret);
  }

  public getToken(req: Request | IAuthRequest): any {
    return req?.headers?.authorization?.split(" ")[1];
  }
}

export { Token };
export default new Token();
