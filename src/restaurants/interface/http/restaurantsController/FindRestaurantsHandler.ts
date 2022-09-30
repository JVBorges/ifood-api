import { FindRestaurants } from "@/restaurants/application/query/FindRestaurants"
import { handler } from "@/_lib/http/handler"
import { makePaginator } from "@/_lib/http/validation/Paginator"
import Joi from "types-joi"

type Dependencies = { 
  findRestaurants: FindRestaurants
}

const { getFilter, getPagination, getSorter } = makePaginator({
  filter: Joi.string().optional()
});

const findRestaurantsHandler = handler(({ findRestaurants }: Dependencies) => async (req, res) => {
  const filter = getFilter(req);
  const pagination = getPagination(req);
  const sort = getSorter(req);

  const restaurants = await findRestaurants({
    filter: { name: filter },
    sort,
    pagination,
  });

  res.json(restaurants);
})

export { findRestaurantsHandler }