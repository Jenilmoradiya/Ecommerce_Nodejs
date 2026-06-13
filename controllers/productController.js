import productModel from "../models/productModel.js"



export const getAllProductsController = async(req,res) =>{
  
  try {
    const products=await productModel.find({})
   if(!products){
    return res.status(200).send({
      success:true,
      message:"no products found"
    })

   }
   
    return res.status(200).send({
  success:true,
      message:"all products",
      products
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success:true,
      message:"error in get all products"
    })
  }

}

export const getSingleProductController = async(req,res) =>{
  
  try {
    const product=await productModel.findById(req.params.id)
   if(!product){
    return res.status(400).send({
      success:false,
      message:"no product found"
    })
   }
       return res.status(200).send({
  success:true,
      message:"product you asked for",
      product
    })
  } catch (error) {
    console.log(error)
    if(error.name==="CastError"){
        return res.status(500).send({
      success:true,
      message:"invalid id"
    })
    }
    return res.status(500).send({
      success:true,
      message:"error in getting single product"
    })
  }

}