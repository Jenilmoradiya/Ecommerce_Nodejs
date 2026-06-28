import express from "express"
import { isAuth } from "../middlewares/authMiddleware.js"
import { singleUpload } from "../middlewares/multer.js"
import { createCategory, deleteCategoryController, getallCategories, updateCategoryController } from "../controllers/categoryController.js"

const router=express.Router()

router.post("/create",isAuth,createCategory)
router.get("/getallcategories",isAuth,getallCategories)
router.delete("/delete/:id",isAuth,deleteCategoryController)
router.put("/update/:id",isAuth,updateCategoryController)


export default router