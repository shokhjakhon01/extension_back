import { Router } from "express"
import categoryController from "../controllers/category.controller.js"
import protect from "../middlewares/protect.js"

const router = new Router()

router.get("/category", protect, categoryController.getAllCategories)
router.get("/category/:id", protect, categoryController.getSingleCategory)
router.post("/category", protect, categoryController.createCategory)
router.put("/category/:id", protect, categoryController.updateCategory)
router.delete("/category/:id", protect, categoryController.deleteCategory)

export default router
