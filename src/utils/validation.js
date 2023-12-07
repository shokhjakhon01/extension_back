import Joi from "joi"

export const RegisterSchema = Joi.object({
  username: Joi.string()
    .min(2)
    .max(32)
    .pattern(new RegExp("^[a-z0-9]{3,30}$"))
    .required(),
  password: Joi.string().min(8).max(100).required(),
  email: Joi.string().required(),
  // avatar: Joi.string().pattern(new RegExp("((jpe?g|png|gif|bmp))$")).required(),
})

export const LoginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
})
