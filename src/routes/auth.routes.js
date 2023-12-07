import { Router } from "express"
import validate from "../middlewares/validate.js"
import authController from "../controllers/auth.controller.js"

const router = new Router()

router.post("/register", validate, authController.register)
router.post("/login", validate, authController.login)

export default router
