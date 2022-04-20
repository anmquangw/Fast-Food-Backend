import bcrypt from "bcrypt";

import env from "../configs/env";

class HashPassword {
  private readonly saltRounds = env.GEN_SALT;

  public hash(password: string): string {
    return bcrypt.hashSync(password, this.saltRounds);
  }

  public compare(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}

export default new HashPassword();
