import { PaginatedQueryResult, QueryHandler, SortedPaginatedQuery } from "@/_lib/CQRS";

type RestaurantListItemDTO = Readonly<{
  id: string;
  name: string;
  description: string;
  address: Readonly<{
    zipcode: number
    country: string,
    number: number,
    city: string,
    street: string,
    state: string,
    neighborhood: string,
    complement: string
  }>;
  hours: ReadonlyArray<{
    from: string;
    to: string;
    open: string;
    close: string;
  }>;
  menu: Readonly<{
    groups: ReadonlyArray<{
      id: number;
      index: number;
      name: string;
      products: ReadonlyArray<{
        id: number;
        group_id: number;
        group_name: string;
        name: string;
        description: string;
        images: Readonly<{
          small: string;
          medium: string;
          large: string;
        }>;
        min_price: number;
        prices: ReadonlyArray<{
          code: string;
          name: string;
          price: number;
        }>
      }>;
    }>
  }>;
  createdAt: Date;
}>

type RestaurantFilter = {
  name?: string;
}

type FindRestaurants = 
  QueryHandler<SortedPaginatedQuery<RestaurantFilter>, PaginatedQueryResult<RestaurantListItemDTO[]>>;

export { FindRestaurants }