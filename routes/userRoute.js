import express from "express"
import { getUserProfileController, loginController, logoutController, registerController, updatePasswordController, userProfileUpdateController } from "../controllers/userController.js"
import { isAuth } from "../middlewares/authMiddleware.js"
import { singleUpload } from "../middlewares/multer.js"


const router=express.Router()

router.post("/register",registerController)
router.post("/login",loginController)
router.get("/profile",isAuth,getUserProfileController)
router.post("/logout",isAuth,logoutController)
router.put("/profile-update",isAuth,userProfileUpdateController)
router.put("/update-password",isAuth,updatePasswordController)
router.put("/update-proficepic",singleUpload,updateProfilePicController)

export default router