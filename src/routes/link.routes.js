import { Router } from "express"
import linkController from "../controllers/link.controller.js"
import protect from "../middlewares/protect.js"

const router = new Router()

router.get("/links", linkController.getAllLinks)
router.get("/links/:id", protect, linkController.getSingleLink)
router.post("/links", protect, linkController.createLink)
router.put("/links/:id", protect, linkController.updateLink)
router.delete("/links/:id", protect, linkController.deleteLink)

export default router
