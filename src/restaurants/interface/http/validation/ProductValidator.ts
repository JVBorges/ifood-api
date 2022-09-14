import Joi from 'types-joi';

export const ProductValidator = Joi.object({
  id: Joi.number().required(),
  group_id: Joi.number().required(),
  group_name: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  images: Joi.object({
    small: Joi.string().required(),
    medium: Joi.string().required(),
    large: Joi.string().required(),
  }).required(),
  min_price: Joi.number().required(),
  prices: Joi.array().items(
    Joi.object({
      code: Joi.string().required(),
      name: Joi.string().required(),
      price: Joi.number().required(),
    })
  ).required(),
})