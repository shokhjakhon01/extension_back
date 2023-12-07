import User from "../models/users.model.js"
import { AuthorizationError, InternalServerError } from "../utils/errors.js"
import jwt from "../utils/jwt.js"

const protect = async (req, res, next) => {
  try {
    let token
    if (req.headers.token) {
      token = req.headers.token
    }

    if (!token) {
      return next(
        new AuthorizationError(
          401,
          "You are not login! Please login for access"
        )
      )
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    const currentUser = await User.findById(decoded.id)

    if (!currentUser) {
      return next(
        new AuthorizationError(401, "User associated with the token not found.")
      )
    }

    req.user = currentUser

    next()
  } catch (error) {
    return next(new InternalServerError(500, error.message))
  }
}

export default protect
