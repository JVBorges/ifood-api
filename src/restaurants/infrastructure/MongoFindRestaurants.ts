import MUUID from 'uuid-mongodb';
import { Filter } from 'mongodb';
import { RestaurantCollection, RestaurantSchema } from './RestaurantCollection';
import { FindRestaurants } from '../application/query/FindRestaurants';

type Dependencies = {
  restaurantCollection: RestaurantCollection;
};

const makeMongoFindRestaurants =
  ({ restaurantCollection }: Dependencies): FindRestaurants =>
  async ({ pagination, filter, sort }) => {
    let match: Filter<RestaurantSchema> = {};

    if (filter.name) {
      match = {
        ...match,
        name: { $regex: `^${filter.name}`, $options: 'i' },
      };
    }
    
    const restaurants = await restaurantCollection
      .aggregate([
        {
          $match: match,
        },
        {
          $skip: Math.max(1 - pagination.page, 0) * pagination.pageSize,
        },
        {
          $limit: pagination.pageSize,
        },
        ...(sort?.length
          ? [{ $sort: sort.reduce((acc, { field, direction }) => ({ [field]: direction === 'asc' ? 1 : -1 }), {}) }]
          : [])
      ])
      .toArray();

    const totalElements = await restaurantCollection.countDocuments(match);

    const totalPages = Math.ceil(totalElements / pagination.pageSize);

    return {
      data: restaurants.map((restaurant) => ({
        id: MUUID.from(restaurant._id).toString(),
        name: restaurant.name,
        description: restaurant.description,
        address: restaurant.address,
        hours: restaurant.hours,
        menu: restaurant.menu,
        createdAt: restaurant.createdAt,
      })),
      page: {
        totalPages,
        pageSize: pagination.pageSize,
        totalElements,
        current: pagination.page,
        first: pagination.page === 1,
        last: pagination.page === totalPages,
      },
    };
  };

export { makeMongoFindRestaurants };
