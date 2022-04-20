import env from "./configs/env";

import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { API } from "./routes/index";
import Db from "./common/db";
import HttpStatus, { PRODUCTION } from "./configs/status";

class App {
  public static isDebug = env.NODE_ENV !== PRODUCTION;
  public app: express.Application;

  constructor() {
    this.app = express();
    // config
    this.config();

    // routes
    this.routes();
  }
  
  private config(): void {
    // this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());

    this.app.use(cors());

    new Db();
  }

  public routes(): void {
    this.app.use(API);
    this.app.use("*", (req: Request, res: Response): any => {
      return res.status(HttpStatus.NOT_FOUND).json({ error: "NotFound" });
    });
  }

  public run(port: number = env.PORT): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}

export default App;
