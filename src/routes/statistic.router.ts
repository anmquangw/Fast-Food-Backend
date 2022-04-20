import { RoutesAuth } from "../base/Routes";

import { Statistic as StatisticController } from "../controllers";

class Statistic extends RoutesAuth {
  constructor(dir: string = "/") {
    super(dir);
    // get statistic year, date, time
    this.noAuth.get("/", StatisticController.list);
  }
}

export default new Statistic("/statistic").router;
