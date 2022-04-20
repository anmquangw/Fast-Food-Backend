import { RoutesAuth } from "../base/Routes";

import { Food as FoodController } from "../controllers";

class Food extends RoutesAuth {
  constructor(dir: string = "/") {
    super(dir);
    /**
     * get list => [no param]
     * get list by food type => [idFoodType=idFoodType]
     **/
    this.noAuth.get("/", FoodController.list);

    // get list by order rate
    this.noAuth.get("/orderRate", FoodController.listByOrderRate);

    // get detail
    this.noAuth.get("/:id", FoodController.detail);

    // create
    this.adminAuth.post("/", FoodController.create);

    // update
    this.adminAuth.put("/:id", FoodController.update);

    // delete
    this.adminAuth.delete("/:id", FoodController.remove);
  }
}

export default new Food("/food").router;
