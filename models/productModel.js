import mongoose from "mongoose"

const productSchema=mongoose.Schema({

  name:{
    type:String,
    required:[true,"name is needed"]
  },
  price:{
    type:Number,
    required:[true,"product price is needed"]
  },
  description:{
    type:String,
    required:[true,"product description is needed"]
  },
  stock:{
    type:Number,
    required:[true,"product stock is needed"]
  },
  category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"category"
  },
  images:[{
    public_id:String,
    url:String
  }]

},{timeStamps:true})

const productModel=mongoose.model("product",productSchema)
export default productModel