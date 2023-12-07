import { BadRequest, InternalServerError } from "../utils/errors.js"
import { LoginSchema, RegisterSchema } from "../utils/validation.js"

export default (req, res, next) => {
  try {
    const { username, password, email } = req.body

    if (req.url == "/register" && req.method == "POST") {
      const { error } = RegisterSchema.validate({ username, password, email })

      if (error) next(new BadRequest(400, error.message))
    }

    if (req.url == "/login" && req.method == "POST") {
      const { error } = LoginSchema.validate({ password, email })

      if (error) next(new BadRequest(400, error.message))
    }

    next()
  } catch (error) {
    return next(new InternalServerError(500, error.message))
  }
}
