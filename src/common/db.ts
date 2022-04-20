import env from "../configs/env";

import mongoose from "mongoose";

class Db {
  private readonly connectionString: string = env.DB_CONNECT_STRING;
  constructor() {
    this.connect();
  }

  private connect(): void {
    mongoose
      .connect(this.connectionString, {
        keepAlive: true,
        keepAliveInitialDelay: 300000,
      })
      .then(() => {
        console.log(`Connected to database ${this.connectionString}`);
      })
      .catch((err) => {
        console.log("Error connecting to database", err);
        setTimeout(() => {
          this.connect();
        }, 5000);

        clearTimeout();
      });
  }
}

export default Db;
