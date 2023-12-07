export class BadRequest extends Error {
  constructor(status, message) {
    super()
    this.name = "BadRequest"
    this.status = status
    this.message = message
  }
}
export class InternalServerError extends Error {
  constructor(status, message) {
    super()
    this.name = "InternalServerError"
    this.status = status
    this.message = message
  }
}
export class AuthorizationError extends Error {
  constructor(status, message) {
    super()
    this.name = "AuthorizationError"
    this.status = status
    this.message = message
  }
}
export class NotFountError extends Error {
  constructor(status, message) {
    super()
    this.name = "NotFountError"
    this.status = status
    this.message = message
  }
}
export class ForBiddenError extends Error {
  constructor(status, message) {
    super()
    this.name = "ForBiddenError"
    this.status = status
    this.message = message
  }
}
