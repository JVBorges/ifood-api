import { Router } from "express";
import { createRestaurantHandler } from "./CreateRestaurantHandler";
import { fetchRestaurantHandler } from "./FetchRestaurantHandler";
import { findRestaurantsHandler } from "./FindRestaurantsHandler";

type Dependencies = {
  apiRouter: Router;
};

const makeRestaurantController = ({ apiRouter }: Dependencies) => {
  const router = Router();

  router.get('/restaurants', findRestaurantsHandler);
  router.post('/restaurant', createRestaurantHandler);
  router.get('/restaurant/:restaurantId', fetchRestaurantHandler);
  
  // GET restaurant/[:restaurantId]/products
  // GET restaurant/[:restaurantId]/product/[:productId]

  apiRouter.use(router);
};

export { makeRestaurantController };