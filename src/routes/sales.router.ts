import { RoutesAuth } from "../base/Routes";

import { Sales as SalesController } from "../controllers";

class Sales extends RoutesAuth {
  constructor(dir: string = "/") {
    super(dir);
    // check is the code
    this.userAuth.get("/code", SalesController.checkCode);

    // get list
    this.adminAuth.get("/", SalesController.list);

    // get detail
    this.adminAuth.get("/:id", SalesController.getDetail);

    // create
    this.adminAuth.post("/", SalesController.create);

    // update
    this.adminAuth.put("/:id", SalesController.update);

    // delete
    this.adminAuth.delete("/:id", SalesController.remove);
  }
}

export default new Sales("/sales").router;
