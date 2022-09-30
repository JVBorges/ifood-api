import { FindRestaurantProducts } from "@/restaurants/application/query/FindRestaurantProducts";
import { handler } from "@/_lib/http/handler"
import { makePaginator } from "@/_lib/http/validation/Paginator";
import Joi from "types-joi"

type Dependencies = {
  findRestaurantProducts: FindRestaurantProducts
}

const { getFilter, getPagination, getSorter } = makePaginator({
  filter: Joi.object({
    name: Joi.string().optional(),
    group_name: Joi.string().optional(),
  })
});

const findRestaurantProductsHandler =
  handler(({ findRestaurantProducts }: Dependencies) =>
  async (req, res) => {
    const filter = getFilter(req);
    const pagination = getPagination(req);
    const sort = getSorter(req);

    const { restaurantId } = req.params;

    const products = await findRestaurantProducts({
      filter: { ...filter, restaurantId },
      sort,
      pagination,
    });

    res.json(products);
  });

export { findRestaurantProductsHandler }