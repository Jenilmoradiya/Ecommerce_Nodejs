import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"

export const isAuth = async (req, res,next) =>{

 const{token}=req.cookies

 if(!token){
  return res.status(400).send({ 
    success:false,
    message:"unauthorized user"
  })
 }

 const decodeData= jwt.verify(token, process.env.JWT_SECRET)
 req.user= await userModel.findById(decodeData._id)
 next()

}