const mongoose=require ("mongoose");
const notesschema=new mongoose.Schema({
    title:{
        type:String,
    },
    content:{
        type:String, 
    },
    userid:{
        type:mongoose.Schema.ObjectId,
        ref:'loginschema',
        required:true,
    },
    createdat:{
        type:Date,
        default:Date.now,
    },
    updatedat:{
        type:Date,
        default:Date.now,
    }
})
module.exports=mongoose.model("notes",notesschema);