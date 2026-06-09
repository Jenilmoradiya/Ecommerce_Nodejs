import express from "express"
import morgan from "morgan"
import cors from "cors"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import cookieParser from "cookie-parser"
import cloudinary from "cloudinary"

dotenv.config()

//Dd connection
connectDb()

//cloudinary config
cloudinary.v2.config({
cloud_name:process.env.CLOUDINARY_NAME,
api_key:process.env.CLOUDINARY_API_KEY,
secret_key:process.env.CLOUDINARY_SECRET_KEY
})

const app=express()



//middleware
app.use(express.json())
app.use(morgan("dev"))
app.use(express())
app.use(cors())
app.use(cookieParser())

//routes
app.use("/api/v1/user",userRouter)



app.listen(process.env.PORT,()=>{
  console.log("connected to port")
})