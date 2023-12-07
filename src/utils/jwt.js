import jwt from "jsonwebtoken"

const SECRET = process.env.SECRET_KEY || "apple"

export default {
  sign: (payload) => jwt.sign(payload, SECRET),
  verify: (token) => {
    let payload
    jwt.verify(token, SECRET, (err, decode) => {
      if (err instanceof jwt.JsonWebTokenError) {
        throw new Error("Invalid token received.")
      }
      if (err instanceof jwt.TokenExpiredError) {
        throw new Error("Token expired. Try to login again.")
      }
      payload = decode
    })
    return payload
  },
}
