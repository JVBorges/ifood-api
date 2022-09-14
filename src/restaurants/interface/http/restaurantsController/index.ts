import { Router } from "express";
import { createRestaurantHandler } from "./CreateRestaurantHandler";

type Dependencies = {
  apiRouter: Router;
};

const makeRestaurantController = ({ apiRouter }: Dependencies) => {
  const router = Router();

  router.post('/restaurant', createRestaurantHandler);
  
  apiRouter.use(router);
};

export { makeRestaurantController };