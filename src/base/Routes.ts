import express, { Response, NextFunction } from "./Controllers";
import Auth from "../middlewares/auth";

abstract class Routes {
  public router: express.Router = express.Router();
  public rootDir: string = "/";

  constructor(rootDir: string = "/") {
    this.rootDir = rootDir;
  }

  public route(path = "/") {
    return this.router.route(path);
  }
}

abstract class Method extends Routes {
  // methods
  protected get(
    path: string,
    callback: (req: any, res: Response) => any,
    middleware = [(req: any, res: Response, next: NextFunction) => next()],
    options: {}
  ) {
    this.route(this.rootDir + path).get(middleware, callback);
  }

  protected post(
    path: string,
    callback: (req: any, res: Response) => any,
    middleware = [(req: any, res: Response, next: NextFunction) => next()],
    options: {}
  ) {
    this.route(this.rootDir + path).post(middleware, callback);
  }

  protected put(
    path: string,
    callback: (req: any, res: Response) => any,
    middleware = [(req: any, res: Response, next: NextFunction) => next()],
    options: {}
  ) {
    this.route(this.rootDir + path).put(middleware, callback);
  }

  protected delete(
    path: string,
    callback: (req: any, res: Response) => any,
    middleware = [(req: any, res: Response, next: NextFunction) => next()],
    options: {}
  ) {
    this.route(this.rootDir + path).delete(middleware, callback);
  }
}

class RoutesFlow extends Routes {
  protected api(route: express.Router = this.router) {
    this.router.use("/api", route);
  }
}

class RoutesAuth extends Method {
  constructor(dir: string = "/") {
    super(dir);
  }

  // authendication
  public noAuth = {
    get: (
      path: string,
      callback: (req: any, res: Response) => any,
      options: object = {}
    ) => this.get(path, callback, [], options),
    post: (
      path: string,
      callback: (req: any, res: Response) => any,
      options: object = {}
    ) => this.post(path, callback, [], options),
    put: (
      path: string,
      callback: (req: any, res: Response) => any,
      options: object = {}
    ) => this.put(path, callback, [], options),
    delete: (
      path: string,
      callback: (req: any, res: Response) => any,
      options: object = {}
    ) => this.delete(path, callback, [], options),
  };
  public userAuth = {
    get: (
      path: string,
      callback: (req: any, res: Response) => any,
      options: object = {}
    ) => this.get(path, callback, [Auth.isLoggerIn], options),
    post: (
      path: string,
      callback: (req: any, res: Response) => any,
      options: object = {}
    ) => this.post(path, callback, [Auth.isLoggerIn], options),
    put: (
      path: string,
      callback: (req: any, res: Response) => any,
      options: object = {}
    ) => this.put(path, callback, [Auth.isLoggerIn], options),
    delete: (
      path: string,
      callback: (req: any, res: Response) => any,
      options: object = {}
    ) => this.delete(path, callback, [Auth.isLoggerIn], options),
  };
  public adminAuth = {
    get: (
      path: string,
      callback: (req: any, res: Response) => any,
      options: object = {}
    ) => this.get(path, callback, [Auth.isLoggerIn, Auth.isAdmin], options),
    post: (
      path: string,
      callback: (req: any, res: Response) => any,
      options: object = {}
    ) => this.post(path, callback, [Auth.isLoggerIn, Auth.isAdmin], options),

    put: (
      path: string,
      callback: (req: any, res: Response) => any,
      options: object = {}
    ) => this.put(path, callback, [Auth.isLoggerIn, Auth.isAdmin], options),
    delete: (
      path: string,
      callback: (req: any, res: Response) => any,
      options: object = {}
    ) => this.delete(path, callback, [Auth.isLoggerIn, Auth.isAdmin], options),
  };
}

export { Routes, RoutesFlow, RoutesAuth };
