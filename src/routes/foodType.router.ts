import { RoutesAuth } from "../base/Routes";

import { FoodType as FoodTypeController } from "../controllers";

class FoodType extends RoutesAuth {
  constructor(dir: string = "/") {
    super(dir);

    // get list
    this.noAuth.get("/", FoodTypeController.list);

    // get detail
    this.noAuth.get("/:id", FoodTypeController.detail);

    // create
    this.adminAuth.post("/", FoodTypeController.create);

    // update
    this.adminAuth.put("/:id", FoodTypeController.update);

    // delete
    this.adminAuth.delete("/:id", FoodTypeController.remove);
  }
}

export default new FoodType("/foodType").router;
