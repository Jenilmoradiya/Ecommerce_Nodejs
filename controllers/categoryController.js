import categorymodel from "../models/categoryModel.js"
import productModel from "../models/productModel.js"


export const createCategory= async(req,res)=>{

  try {

    const{category}=req.body
    if(!category){
        return res.status(404).send({
      success:"false",
      message:"category not found"
    })
    }
    await categorymodel.create({category})
      return res.status(200).send({
      success:"true",
      message:"Category created successful",
      category
    })
    
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success:"false",
      message:"Error in create category"
    })
  }
}

export const getallCategories= async(req,res)=>{

  try {

    const categories=await categorymodel.find({})
    if(categories){
      return res.status(200).send({
      "success":"true",
      "message":"all categories",
      categories
    })
    }
    
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      "success":"false",
      "message":"error in getting all categories",
    })
  }
}

export const deleteCategoryController=async(req,res)=>{

  try {
    const category=await categorymodel.findById(req.params.id)
  if(!category){
    return res.status(404).send({
      "success":"false",
      "message":"category not found"
    })
  }
  const products=await productModel.find({category:category._id})
  for(let i=0;i<products.length;i++){
    let product=products[i]
    product.category=undefined
    await product.save()
  }
await category.deleteOne()
return res.status(200).send({
  "success":"true",
  "message":"Category deleted successfully"

})

  } catch (error) {
    console.log(error)
    return res.status(500).send({
      "success":"false",
      "message":"error in delete category api"
    })
  }
}


export const updateCategoryController=async(req,res)=>{

  try {
    const category=await categorymodel.findById(req.params.id)
  if(!category){
    return res.status(404).send({
      "success":"false",
      "message":"category not found"
    })
  }
  const {updatedCategory}=req.body
  const products=await productModel.find({category:category._id})
  for(let i=0;i<products.length;i++){
    let product=products[i]
    product.category=updatedCategory
    await product.save()
  }
  if(updatedCategory) category.category=updatedCategory;
await category.save()
return res.status(200).send({
  "success":"true",
  "message":"Category updated successfully"
  
})

  } catch (error) {
    console.log(error)
    return res.status(500).send({
      "success":"false",
      "message":"error in update category api"
    })
  }
}