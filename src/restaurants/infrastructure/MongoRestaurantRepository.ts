import { Restaurant } from '@/restaurants/domain/Restaurant';
import { RestaurantRepository } from '@/restaurants/domain/RestaurantRepository';
import { RestaurantCollection } from '@/restaurants/infrastructure/RestaurantCollection';
import { RestaurantMapper } from '@/restaurants/infrastructure/RestaurantMapper';
import { RestaurantId } from '@/_sharedKernel/domain/RestaurantId';
import { RestaurantIdProvider } from '@/_sharedKernel/infrastructure/RestaurantIdProvider';
import { v4 } from 'uuid-mongodb';

type Dependencies = {
  restaurantCollection: RestaurantCollection;
};

const makeMongoRestaurantRepository = ({ restaurantCollection }: Dependencies): RestaurantRepository => ({
  async getNextId(): Promise<RestaurantId> {
    return Promise.resolve(RestaurantIdProvider.create(v4().toString()));
  },
  async store(entity: Restaurant.Type): Promise<void> {
    const { _id, version, ...data } = RestaurantMapper.toData(entity);

    const count = await restaurantCollection.countDocuments({ _id });

    if (count) {
      await restaurantCollection.updateOne(
        { _id, version, deleted: false },
        {
          $set: {
            ...data,
            updatedAt: new Date(),
            version: version + 1,
          },
        }
      );

      return;
    }

    await restaurantCollection.insertOne({
      _id,
      ...data,
      version,
    });
  },
});

export { makeMongoRestaurantRepository };
