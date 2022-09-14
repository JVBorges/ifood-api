import { Restaurant } from '@/restaurants/domain/Restaurant';
import { Event } from '@/_lib/events/Event';
import { v4 } from 'uuid-mongodb';

namespace RestaurantCreatedEvent {
  export const topic = 'Restaurant' as const;
  export const eventType = 'RestaurantCreatedEvent' as const;

  type RestaurantCreatedEvent = Event<Restaurant.Type, typeof eventType, typeof topic>;

  export const create = (restaurant: Restaurant.Type): RestaurantCreatedEvent => ({
    eventId: v4().toString(),
    eventType,
    topic,
    payload: restaurant,
  });

  export type Type = RestaurantCreatedEvent;
}

export { RestaurantCreatedEvent };
