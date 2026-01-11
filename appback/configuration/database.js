const mongoose=require("mongoose");
require("dotenv").config();
const dbconnect=async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URL)
        .then(()=>{console.log("connected to database")})
    }catch(error){
        console.log(error);
    }
}
module.exports=dbconnect;