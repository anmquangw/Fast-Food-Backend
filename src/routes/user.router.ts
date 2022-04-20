import { RoutesAuth } from "../base/Routes";
import { User as UserController } from "../controllers";

class User extends RoutesAuth {
  constructor(dir: string = "/") {
    super(dir);

    // get list of user
    this.adminAuth.get("/", UserController.list);
    
    // signup
    this.noAuth.post("/signup", UserController.signup);

    // signin
    this.noAuth.post("/signin", UserController.signin);

    // update status
    this.adminAuth.put("/status/:id", UserController.updateStatus);

    // reset password
    this.userAuth.put("/password", UserController.resetPassword);

    // lock user
    this.adminAuth.delete("/:id", UserController.remove);
  }
}

export default new User("/user").router;
