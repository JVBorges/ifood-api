import { asFunction } from 'awilix';
import { makeModule } from '@/context';
import { CreateRestaurant, makeCreateRestaurant } from './application/useCases/CreateRestaurant';
import { RestaurantRepository } from './domain/RestaurantRepository';
import { initRestaurantCollection, RestaurantCollection } from './infrastructure/RestaurantCollection';
import { makeMongoRestaurantRepository } from './infrastructure/MongoRestaurantRepository';
import { withMongoProvider } from '@/_lib/MongoProvider';
import { toContainerValues } from '@/_lib/di/containerAdapters';
import { makeRestaurantController } from './interface/http/restaurantsController';
import { makeMongoFindRestaurants } from './infrastructure/MongoFindRestaurants';
import { FindRestaurants } from './application/query/FindRestaurants';

const restaurantModule = makeModule('restaurant', async ({ container: { register }, initialize }) => {
  const [collections] = await initialize(
    withMongoProvider({
      restaurantCollection: initRestaurantCollection,
    })
  );

  register({
    ...toContainerValues(collections),
    restaurantRepository: asFunction(makeMongoRestaurantRepository),
    createRestaurant: asFunction(makeCreateRestaurant),
    findRestaurants: asFunction(makeMongoFindRestaurants),
  });

  await initialize(makeRestaurantController);
});

type RestaurantRegistry = {
  restaurantCollection: RestaurantCollection;
  restaurantRepository: RestaurantRepository;
  createRestaurant: CreateRestaurant;
  findRestaurants: FindRestaurants
};

export { restaurantModule };
export type { RestaurantRegistry };
