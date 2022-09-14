import Joi from 'types-joi';
import { ProductValidator } from "./ProductValidator";

export const MenuValidator = Joi.object({
  groups: Joi.array().items(
    Joi.object({
      id: Joi.number().required(),
      index: Joi.number().default(0),
      name: Joi.string().required(),
      products: Joi.array().items(ProductValidator).required(),
    })
  ).required()
}).required()