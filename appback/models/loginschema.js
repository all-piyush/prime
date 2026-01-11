const mongoose=require ("mongoose");
const loginschema=new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String, 
    },
    googleid:{
        type:String,
    },
    createdat:{
        type:Date,
        default:Date.now,
    }
})
module.exports=mongoose.model("userschema",loginschema);