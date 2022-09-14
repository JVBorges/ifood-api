import { Collection, Db } from 'mongodb';
import { MUUID } from 'uuid-mongodb';
import { Restaurant } from '../domain/Restaurant';

type RestaurantSchema = {
  _id: MUUID;
  name: string;
  description?: string;
  address: Restaurant.Address;
  hours: Restaurant.Hour[];
  menu: Restaurant.Menu;
  createdAt: Date;
  updatedAt: Date;
  version: number;

};

type RestaurantCollection = Collection<RestaurantSchema>;

const initRestaurantCollection = async (db: Db): Promise<RestaurantCollection> => {
  const collection: RestaurantCollection = db.collection('restaurant');

  await collection.createIndex({ title: 1 }, { unique: true });
  await collection.createIndex({ _id: 1, version: 1 });
  await collection.createIndex({ _id: 1, deleted: 1 });

  return collection;
};

export { initRestaurantCollection };
export type { RestaurantSchema, RestaurantCollection };
