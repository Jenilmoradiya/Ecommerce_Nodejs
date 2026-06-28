import express from "express"
import { createProductController, deleteProductController, deleteProductImageController, getAllProductsController, getSingleProductController, UpdateProductController, updateProductPicController } from "../controllers/productController.js"
import { isAuth } from "../middlewares/authMiddleware.js"
import { singleUpload } from "../middlewares/multer.js"

const router=express.Router()

router.get("/getallproducts",getAllProductsController)
router.get("/:id",getSingleProductController)
router.post("/create",isAuth,singleUpload, createProductController)
router.put("/:id",isAuth,UpdateProductController)
router.put("/image/:id",isAuth,singleUpload,updateProductPicController)
router.delete("/image-delete/:id",isAuth,deleteProductImageController )
router.delete("/delete-product/:id",isAuth,deleteProductController )


export default router