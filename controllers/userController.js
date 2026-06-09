import userModel from "../models/userModel.js"
import cookie from "cookie-parser"
import { getDataUri } from "../utils/feature.js"
import cloudinary from "cloudinary"
export const registerController= async(req,res)=>{

  try {
    const{name,email,password,address,city,country,phone}=req.body

    if(!name || !email||!password||!address||!city||!country||!phone){
      return res.status(500).send({
        success:false,
        message:"need all the fileds"
      })
    }

    const verifyemail=await userModel.findOne({email})
    if(verifyemail){
      return res.status(500).send({
        success:false,
        message:"email already registered"
      })
    }

    const user=await userModel.create({
      name,
      email,
      password,
      address,
      city,
      country
      ,phone
    })
    return res.status(201).send({
      success:true,
      message:"registered successfully",
      user
    })
  } catch (error) {
    console.log(error)
    return res.status(400).send("error in register api")
  }
}


export const loginController = async (req,res)=>{

  try {

    const{email,password}=req.body

    if(!email || !password){
      return res.status(500).send({
        success:false,
        message:"need email and password"
      })
    }

    const user= await userModel.findOne({email})
    if(!user){
      return res.status(500).send({
        success:false,
        message:"User not found"
      })
    }

    const ismatch=await user.comparePassword(password)
    if(!ismatch){
       return res.success(500).send({
        success:false,
        message:"Password doesnt match"
       })
    }
    const token= user.generateToken()

    return res.status(200).cookie("token",token,{
      expires: new Date(Date.now()+ 15*24*60*60*1000),
      secure:process.env.NODE_ENV === "development" ? true :false,
        httpOnly:process.env.NODE_ENV === "development" ? true :false,
          sameSite:process.env.NODE_ENV === "development" ? true :false,
    })
    .send({
      status:true,
      message:"login successfull",
      token,
      user
    })
    
  } catch (error) {
    console.log(error)
    return res.status(400).send({
      success:false,
      message:"error in login api"
    })
  }

}


//get user profile

export const getUserProfileController = async(req,res)=>{

  try {
    
    const user=await userModel.findById(req.user._id)
console.log(user)
    return res.status(200).send({
      success:true,
      message:"your profile details",
      user
    })

  } catch (error) {
    
    console.log(error)
    return res.status(400).send({
      success:false,
      message:"error in getting user profile",
      error
    })
  }
}

//logout

export const logoutController = (req,res) =>{

  try {
    return res.status(200).cookie("token","").send(
      {
        success:true,
        message:"logout successfull"
      }
    )
  } catch (error) {
    console.log(error)
    return res.status(400).send({
      success:false,
      message:"error in logout api",
      error

    })
  }
}

//update user

export const userProfileUpdateController = async(req,res) =>{

  try {

    const user = await userModel.findById(req.user._id)
    const{name,email,city,country,address,phone}=req.body
    
    if(name) user.name=name 
    if(email) user.email=email
    if(city) user.city=city
    if(country) user.country=country
    if(address) user.address=address
    if(phone) user.phone=phone

    await user.save()
    return res.status(200).send({
      success:true,
      message:"update successfull",
      user})

  } catch (error) {
      console.log(error)
    return res.status(400).send({
      success:false,
      message:"error in update user api",
      error

    })
  }
} 

// update password
export const updatePasswordController = async(req,res) =>{
  try {

    const user=await userModel.findById(req.user._id)
    const{newpassword,oldpassword}=req.body

    if(!newpassword || !oldpassword){
      return res.status(500).send({
        success:false,
        message:"need both the fields"
      })
    }
    
    const ismatch=await user.comparePassword(oldpassword)
    if(!ismatch){
       return res.success(500).send({
        success:false,
        message:"Password doesnt match"
       })
    }
     user.password=newpassword
    await user.save()
    return res.status(200).send({
      success:true,
      message:"password updated successfully"
    })

  } catch (error) {
    console.log(error)
    return res.status(400).send({
      success:false,
      message:"error in update password api",
      error

    })
  }
}

export const updateProfilePicController = async(req,res)=>{

  try {

    const user=await userModel.findById(req.user._id)
    //get file from client photo
    const file = getDataUri(req.file)
      // delete prev image
    await cloudinary.v2.uploader.destroy(user.profilePic.public_id)
     // update new img
    const cdb =await cloudinary.v2.uploader.upload(file.content)

    user.profilePic ={
      public_id:cdb.public_id,
      url:cdb.secure_url
    }
await user.save()
    res.status(200).send({
      success:true,
      message:"profile picture updated"
    })

  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success:false,
      message:"error in update profile pic api",
      error
    })
  }
}