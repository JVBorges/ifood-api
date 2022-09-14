import Joi from 'types-joi';
import { MenuValidator } from "./MenuValidator";

export const RestaurantValidator = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  address: Joi.object({
    zipcode: Joi.number().required(),
    country: Joi.string().optional(),
    number: Joi.number().optional(),
    city: Joi.string().optional(),
    street: Joi.string().optional(),
    state: Joi.string().optional(),
    neighborhood: Joi.string().optional(),
    complement: Joi.string().optional(),
  }).required(),
  hours: Joi.array().items(
    Joi.object({
      from: Joi.string().required(),
      to: Joi.string().required(),
      open: Joi.string().required(),
      close: Joi.string().required(),
    })
  ).required().min(1),
  menu: MenuValidator
}).required()