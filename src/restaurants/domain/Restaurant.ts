import { AggregateRoot } from '@/_lib/DDD';
import { makeWithInvariants } from '@/_lib/WithInvariants';
import { RestaurantId } from '@/_sharedKernel/domain/RestaurantId';

namespace Restaurant {
  export type Address = {
    zipcode: number
    country?: string,
    number?: number,
    city?: string,
    street?: string,
    state?: string,
    neighborhood?: string,
    complement?: string
  }

  export type Hour = {
    from: string;
    to: string;
    open: string;
    close: string;
  }

  type Restaurant = AggregateRoot<RestaurantId> &
    Readonly<{
      name: string;
      description?: string;
      address: Address;
      hours: Hour[];
      menu: Menu.Type;
      createdAt: Date;
      updatedAt: Date;
      version: number;
    }>;

  const withInvariants = makeWithInvariants<Restaurant>((self, assert) => {
    // assert(self.name?.length > 0);
    // assert(self.description?.length > 0);
    // assert(self.address?.length > 0);
    // assert(self.hours?.length > 0);
    // assert(self.menu?.length > 0);
  });

  type OmitFields = Omit<Restaurant, 'createdAt' | 'updatedAt' | 'version'>;
  
  type RestaurantProps = Readonly<OmitFields & {
    id: RestaurantId;
  }>;

  export const create = withInvariants(
    (props: RestaurantProps): Restaurant => ({
      id: props.id,
      name: props.name,
      description: props.description,
      address: props.address,
      hours: props.hours,
      menu: props.menu,
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 0,
    })
  );

  export type Type = Restaurant;
}

export { Restaurant };