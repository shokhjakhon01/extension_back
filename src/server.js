import express from "express"
import cors from "cors"
import errorControllers from "./controllers/error.controllers.js"
import mongoose from "mongoose"
import { DB, PORT } from "./config.js"
import authRouter from "./routes/auth.routes.js"
import categoryRouter from "./routes/category.routes.js"
import linkRouter from "./routes/link.routes.js"
import { config } from "dotenv"

const app = express()
app.use(cors())
config()
app.use(express.json())
app.use(authRouter)
app.use(categoryRouter)
app.use(linkRouter)

app.use(errorControllers.ERRORS)
mongoose
  .connect(DB)
  .then((res) => {
    console.log("db connected")
  })
  .catch((err) => {
    console.log(err)
  })

app.listen(5000, console.log("connected server on port " + PORT))
