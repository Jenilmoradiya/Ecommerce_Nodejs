import express from "express"
import { getAllProductsController, getSingleProductController } from "../controllers/productController.js"

const router=express.Router()

router.get("/getallproducts",getAllProductsController)
router.get("/:id",getSingleProductController)

export default router