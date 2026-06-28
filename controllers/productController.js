import DataURIParser from "datauri/parser.js"
import productModel from "../models/productModel.js"
import { getDataUri } from "../utils/feature.js"
import cloudinary from "cloudinary"


export const getAllProductsController = async(req,res) =>{
  
  try {
    const products=await productModel.find({}).populate("category")
   if(!products){
    return res.status(404).send({
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
    return res.status(404).send({
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

export const createProductController = async(req,res) =>{

  try {
    const{name,price,description,stock,category}=req.body
   if(!name || !price ||!description || !stock ){
      return res.status(400).send({
      success:false,
      message:"need all the fields"
    })
   }
if(!req.file){
  return res.status(400).send({
      success:false,
      message:"need all file images"
    })
}
   const file= getDataUri(req.file)
   const cdb= await cloudinary.v2.uploader.upload(file.content)
   const image={
    public_id:cdb.public_id,
    url:cdb.secure_url
   }
   const product=await productModel.create({
    name,description,stock,price,category,images:[image]
   })

return res.status(200).send({
  success:true,
  message:"Product created",
  product
})
  } catch (error) {
    console.log(error)
      return res.status(500).send({
      success:true,
      message:"error in create product api"
    })
  }
}

export const UpdateProductController=async(req,res)=>{

try {
   const{name,description,price,stock,category}=req.body
  const product=await productModel.findById(req.params.id)
  if(!product){
      return res.status(404).send({
      success:false,
      message:"product not found"
    })
  }

  if(name)product.name=name
  if(description)product.description=description
  if(price)product.price=price
  if (stock)product.stock=stock
  if(category)product.category=category
  await product.save()

  return res.status(200).send({
    success:"true",
    message:"product updated "
  })
  
} catch (error) {
  console.log(error)
      return res.status(500).send({
      success:true,
      message:"error in create product api"
    })
}
}

export const updateProductPicController= async(req,res) =>{
  try {
  const product=await productModel.findById(req.params.id)
  if(!product){
      return res.status(404).send({
      success:false,
      message:"product not found"
    })
  }

  if(!req.file){
      return res.status(404).send({
      success:false,
      message:"image not found"
    })
  }

  const file=getDataUri(req.file)
  const cdb=await cloudinary.v2.uploader.upload(file.content);
  const image={
    public_id:cdb.public_id,
    url: cdb.secure_url
  }

  product.images.push(image);
  await product.save()
  res.status(200).send({
    success:true,
    message:"product image updated"
  })

  } catch (error) {
      console.log(error)
      return res.status(500).send({
      success:true,
      message:"error in update product picture api"
    })
  }
}

export const deleteProductImageController = async(req,res)=>{

  try {
    
const product=await productModel.findById(req.params.id)
if(!product){
  return res.status(404).send({
    success:false,
    message:"Product not found"
  })
}
//image id found
const id=req.query.id
//image not found
if(!id){
  return res.status(404).send({
    success:false,
    message:"Invalid Id"
  })
}
let isExist= -1;
product.images.forEach((item,index)=>{
  if (item._id.toString()=== id.toString()) isExist= index;
});
if(isExist<0){
  return res.status(404).send({
    success:false,
    message:"image Not found",
  })
}
//Delete product image
await cloudinary.v2.uploader.destroy(product.images[isExist].public_id);
await product.save();
return res.status(200).send({
  success:true,
  message:"Product image deleted successfully"
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
      message:"error deleting product image"
    })
  }

}

export const deleteProductController= async(req,res)=>{
  try {

    const product=await productModel.findById(req.params.id)
    if(!product){
      return res.status(404).send({
        success:false,
          message:"product not found"
      })
    }
    for(let index=0; index<product.images.length;index++){
      await cloudinary.v2.uploader.destroy(product.images[index].public_id);
    }

    await product.deleteOne();
    res.status(200).send({
      success:true,
      messgae:"Product deleted successfully"
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
      message:"error in deleting product"
    })
  }
}