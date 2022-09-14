import { makeIdProvider } from '@/_lib/IdProvider';
import { RestaurantId } from '../domain/RestaurantId';

const RestaurantIdProvider = makeIdProvider<RestaurantId>('RestaurantId');

export { RestaurantIdProvider };
