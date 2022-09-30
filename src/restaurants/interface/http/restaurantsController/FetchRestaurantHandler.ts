import { FetchRestaurant } from "@/restaurants/application/useCases/FetchRestaurant"
import { handler } from "@/_lib/http/handler"

type Dependencies = {
  fetchRestaurant: FetchRestaurant
}

const fetchRestaurantHandler = 
  handler(({ fetchRestaurant }: Dependencies) => 
  async (req, res) => {
    const { restaurantId } = req.params;

    const restaurant = await fetchRestaurant(restaurantId);

    res.json(restaurant);
  })

export { fetchRestaurantHandler };