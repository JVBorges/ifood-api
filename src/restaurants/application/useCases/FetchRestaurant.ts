import { Restaurant } from "@/restaurants/domain/Restaurant"
import { RestaurantRepository } from "@/restaurants/domain/RestaurantRepository"
import { ApplicationService } from "@/_lib/DDD"

type Dependencies = {
  restaurantRepository: RestaurantRepository
}

type FetchRestaurant = ApplicationService<string, Restaurant.Type>

const makeFetchRestaurant =
  ({ restaurantRepository }: Dependencies): FetchRestaurant => 
  async (payload: string) => {
    const restaurant = await restaurantRepository.findById(payload);

    return restaurant;
  };

export { makeFetchRestaurant }
export type { FetchRestaurant }