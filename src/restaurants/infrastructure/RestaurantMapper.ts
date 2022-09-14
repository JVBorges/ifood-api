import { DataMapper } from '@/_lib/DDD';
import { RestaurantIdProvider } from '@/_sharedKernel/infrastructure/RestaurantIdProvider';
import { from } from 'uuid-mongodb';
import { Restaurant } from '../domain/Restaurant';
import { RestaurantSchema } from './RestaurantCollection';

const RestaurantMapper: DataMapper<Restaurant.Type, RestaurantSchema> = {
  toData: (entity: Restaurant.Type) => ({
    _id: from(entity.id.value),
    name: entity.name,
    description: entity.description,
    address: entity.address,
    hours: entity.hours,
    menu: entity.menu,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
    version: entity.version,
  }),
  toEntity: (data: RestaurantSchema) => ({
    id: RestaurantIdProvider.create(from(data._id).toString()),
    name: data.name,
    description: data.description,
    address: data.address,
    hours: data.hours,
    menu: data.menu,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    version: data.version,
  }),
};

export { RestaurantMapper };
