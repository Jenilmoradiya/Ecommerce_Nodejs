import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema=mongoose.Schema({

  name:{
    type:String,
    required:[true,"name is required"]
  },
  email:{
    type:String,
    required:[true,"email is required"],
    unique:[true,"email is required"]
  },
  password:{
    type:String,
    required:[true,"password is required"],
    minlength:[6,"minimum 6 characters needed"]
  },
  address:{
    type:String,
    required:[true,"address is required"]
  },
  city:{
    type:String,
    required:[true,"city is required"]
  },

  country:{
    type:String,
    required:[true,"country is required"]
  },
  
  phone:{
    type:String,
    required:[true,"city is required"]
  },
  profilePic:{
    public_id:{
      type:String
    },
    url:{
      type:String
    }
      }

},{timestamps:true})

// encrypt password and save
userSchema.pre("save", async function () {
  if(!this.isModified("password")) return ;
  this.password= await bcrypt.hash(this.password,10)

});

// compare password function
userSchema.methods.comparePassword = async function(plainpassword){
  return await bcrypt.compare(plainpassword, this.password)
}

// create jwt token
userSchema.methods.generateToken=  function(){
  return jwt.sign({_id:this._id},process.env.JWT_SECRET, {expiresIn:"1d"})
}

const userModel=mongoose.model("users",userSchema)
export  default userModel 