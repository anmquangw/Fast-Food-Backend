import { RoutesAuth } from "../base/Routes";

import { Banner as BannerController } from "../controllers";

class Banner extends RoutesAuth {
  constructor(dir: string = "/") {
    super(dir);
    // get list
    this.noAuth.get("/", BannerController.list);

    // create
    this.adminAuth.post("/", BannerController.create);

    // update
    this.adminAuth.put("/:id", BannerController.update);

    // delete
    this.adminAuth.delete("/:id", BannerController.remove);
  }
}

export default new Banner("/banner").router;
