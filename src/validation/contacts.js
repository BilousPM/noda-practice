import Joi from 'joi';

export const contactSchema = Joi.object({
  name: Joi.string().required(),
  number: Joi.string().required(),
});
