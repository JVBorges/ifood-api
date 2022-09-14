

import { ApplicationService } from '@/_lib/DDD';
import { eventProvider } from '@/_lib/pubSub/EventEmitterProvider';
import { Restaurant } from '@/restaurants/domain/Restaurant';
import { RestaurantRepository } from '@/restaurants/domain/RestaurantRepository';
import { RestaurantCreatedEvent } from '../events/RestaurantCreatedEvent';

type Dependencies = {
  restaurantRepository: RestaurantRepository;
};

type CreateRestaurantDTO = {
  name: string;
  description?: string;
  address: Restaurant.Address;
  hours: Restaurant.Hour[];
  menu: Restaurant.Menu;
};

type CreateRestaurant = ApplicationService<CreateRestaurantDTO, string>;

const makeCreateRestaurant = eventProvider<Dependencies, CreateRestaurant>(
  ({ restaurantRepository }, enqueue) =>
    async (payload: CreateRestaurantDTO) => {
      const id = await restaurantRepository.getNextId();

      const restaurant = Restaurant.create({
        id,
        address: payload.address,
        description: payload.description,
        hours: payload.hours,
        menu: payload.menu,
        name: payload.name
      });

      await restaurantRepository.store(restaurant);

      enqueue(RestaurantCreatedEvent.create(restaurant));

      return id.value;
    }
);

export { makeCreateRestaurant };
export type { CreateRestaurant };