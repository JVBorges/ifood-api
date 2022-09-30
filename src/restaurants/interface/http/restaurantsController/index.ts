import { Router } from "express";
import { createRestaurantHandler } from "./CreateRestaurantHandler";
import { findRestaurantsHandler } from "./FindRestaurantsHandler";

type Dependencies = {
  apiRouter: Router;
};

const makeRestaurantController = ({ apiRouter }: Dependencies) => {
  const router = Router();

  router.get('/restaurants', findRestaurantsHandler);
  router.post('/restaurant', createRestaurantHandler);
  
  apiRouter.use(router);
};

export { makeRestaurantController };