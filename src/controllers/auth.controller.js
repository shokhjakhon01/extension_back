import User from "../models/users.model.js"
import {
  AuthorizationError,
  InternalServerError,
  NotFountError,
} from "../utils/errors.js"
import jwt from "../utils/jwt.js"

const createSendToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id })

  user.password = undefined

  res.status(statusCode).json({
    message: "success",
    token,
    user,
  })
}

export default {
  register: async (req, res, next) => {
    try {
      const newUser = await User.create(req.body)
      await newUser.save()

      createSendToken(newUser, 200, res)
    } catch (error) {
      return next(new InternalServerError(500, error.message))
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email }).select("+password")
      if (!user) {
        return next(new NotFountError(404, "User not found"))
      }

      const correct = await user.correctPassword(password, user.password)

      if (!correct) {
        return next(new AuthorizationError(403, "Invalid password or email"))
      }

      createSendToken(user, 200, res)
    } catch (error) {
      return next(new InternalServerError(500, error.message))
    }
  },
}
