import { makeValidator } from '@/_lib/http/validation/Validator';
import { handler } from '@/_lib/http/handler';
import { Request, Response } from 'express';
import { HttpStatus } from '@/_lib/http/HttpStatus';
import { CreateRestaurant } from '@/restaurants/application/useCases/CreateRestaurant';
import { RestaurantValidator } from '../validation/RestaurantValidator';

type Dependencies = {
  createRestaurant: CreateRestaurant;
};

const { getBody } = makeValidator({
  body: RestaurantValidator
});

const createRestaurantHandler = handler(({ createRestaurant }: Dependencies) => async (req: Request, res: Response) => {
  const {
    address,
    description,
    hours,
    menu,
    name
  } = getBody(req);

  const articleId = await createRestaurant({
    address,
    description,
    hours,
    menu,
    name
  });

  res.status(HttpStatus.CREATED).json({ id: articleId });
});

export { createRestaurantHandler };