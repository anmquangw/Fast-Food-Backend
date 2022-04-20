import { RoutesFlow } from "../base/Routes";
import User from "./user.router";
import Banner from "./banner.router";

import Food from "./food.router";
import FoodType from "./foodType.router";
import Sales from "./sales.router";

import Cart from "./cart.router";
import Order from "./order.router";
import Statistic from "./statistic.router";

class Index extends RoutesFlow {
  constructor() {
    super();

    this.api(User);
    this.api(Banner);

    this.api(Food);
    this.api(FoodType);
    this.api(Sales);

    this.api(Cart);
    this.api(Order);
    this.api(Statistic);
  }
}

export const API = new Index().router;
