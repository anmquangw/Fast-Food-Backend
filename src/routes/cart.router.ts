import { RoutesAuth } from "../base/Routes";

import { Cart as CartController } from "../controllers";

import Auth from "../middlewares/auth";

class Cart extends RoutesAuth {
  constructor(dir: string = "/") {
    super(dir);

    // get list items
    this.userAuth.get("/", CartController.list);

    // add item
    this.userAuth.post("/", CartController.add);

    // update item
    this.userAuth.put("/:id", CartController.update);

    // delete item
    this.userAuth.delete("/:id", CartController.remove);
  }
}

export default new Cart("/cart").router;
