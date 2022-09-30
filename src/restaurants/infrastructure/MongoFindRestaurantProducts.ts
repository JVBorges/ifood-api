import MUUID from 'uuid-mongodb';
import { Filter } from 'mongodb';
import { RestaurantCollection, RestaurantSchema } from './RestaurantCollection';
import { FindRestaurantProducts } from '../application/query/FindRestaurantProducts';

type Dependencies = {
  restaurantCollection: RestaurantCollection;
};

const makeMongoFindRestaurantProducts =
  ({ restaurantCollection }: Dependencies): FindRestaurantProducts =>
  async ({ filter, pagination, sort }) => {
    let match: Filter<RestaurantSchema> = {};

    match = {
      ...match,
      _id: MUUID.from(filter.restaurantId)
    }

    if (filter.name) {
      match = {
        ...match,
        name: { $regex: `^${filter.name}`, $options: 'i' },
      };
    }

    if (filter.group_name) {
      match = {
        ...match,
        "menu.groups": {
          products: {
            group_name: { $regex: `^${filter.name}`, $options: 'i' },
          }
        }
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
          : []),
      ])
      .toArray();

    const totalElements = await restaurantCollection.countDocuments(match);

    const totalPages = Math.ceil(totalElements / pagination.pageSize);

    const products = restaurants[0].menu.groups.flatMap(group => group.products)

    return {
      data: products.map((product) => ({
        id: product.id,
        group_id: product.group_id,
        group_name: product.group_name,
        name: product.name,
        description: product.description,
        images: product.images,
        min_price: product.min_price,
        prices: product.prices,
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

export { makeMongoFindRestaurantProducts };
