import User from "../models/users.model.js"
import { InternalServerError } from "../utils/errors.js"

export default {
  getAllUsers: async (req, res, next) => {
    try {
      const users = await User.find()
      res.status(200).json({
        status: "OK",
        data: users,
      })
    } catch (error) {
      return next(new InternalServerError(500, error.message))
    }
  },
}
