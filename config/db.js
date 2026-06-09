import mongoose from "mongoose"

const  connectDb=async() =>{
 try{
  const connection= await mongoose.connect(process.env.MONGO_URL)
  if(!connection){
    console.log("error in connection mongodb")
  }
    console.log("connected to mongo")
}catch(error){
  console.log(error)
}
}


export default connectDb