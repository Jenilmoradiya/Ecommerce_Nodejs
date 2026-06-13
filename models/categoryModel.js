import mongoose from "mongoose"

const categorySchema=mongoose.Schema({

  category:{
    type:String,
    required:[true,"need to define category"]
  }
},{timeStamps:true})

const categorymodel=mongoose.model("category",categorySchema)
export default categorymodel