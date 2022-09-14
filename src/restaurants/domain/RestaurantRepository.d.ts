import { Restaurant } from './Restaurant';
import { Repository } from '@/_lib/DDD';

type RestaurantRepository = Repository<Restaurant.Type>;

export { RestaurantRepository };
