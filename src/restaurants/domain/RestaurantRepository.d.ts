import { Restaurant } from './Restaurant';
import { Repository } from '@/_lib/DDD';

type RestaurantRepository = Repository<Restaurant.Type> & {
  findById(id: string): Promise<Restaurant.Type>
};

export { RestaurantRepository };
