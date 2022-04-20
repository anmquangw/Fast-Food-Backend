import { RoutesAuth } from "../base/Routes";

import { Order as OrderController } from "../controllers";

class Order extends RoutesAuth {
  constructor(dir: string = "/") {
    super(dir);

    // get list
    this.userAuth.get("/", OrderController.list);

    // get order detail
    this.userAuth.get("/:id", OrderController.getDetail);

    // create order
    this.userAuth.post("/", OrderController.create);

    // update status
    this.adminAuth.put("/:id", OrderController.updateStatus);

    // delete order
    this.userAuth.delete("/:id", OrderController.remove);
  }
}

export default new Order("/order").router;
