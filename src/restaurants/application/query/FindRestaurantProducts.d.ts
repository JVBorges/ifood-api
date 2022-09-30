import { PaginatedQueryResult, QueryHandler, SortedPaginatedQuery } from "@/_lib/CQRS";

type RestaurantProductListItemDTO = Readonly<{
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
}>

type RestaurantProductsFilter = {
  restaurantId: string;
  group_name?: string;
  name?: string;
}

type FindRestaurantProducts = 
  QueryHandler<
    SortedPaginatedQuery<RestaurantProductsFilter>,
    PaginatedQueryResult<RestaurantProductListItemDTO[]>
  >;

export { FindRestaurantProducts }