const notes=require('../models/notesschema');
const jwt=require("jsonwebtoken");
exports.addnote=async(req,res)=>{
    try{
        const token=req.cookies.token;
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const id=decoded.id;
        const{title,content}=req.body;
        await notes.create({title:title,content:content,userid:id});
        return res.status(200).json({
            messag:"note added successfully",
            success:true,
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
exports.getnote=async(req,res)=>{
    try{
        const token=req.cookies["token"];
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const id=decoded.id;
        let arr=[];
        arr=await notes.find({userid:id});
        return res.status(200).json({
            allnotes:arr,
            message:"notes fetched successfully",
            success:true,
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
exports.deletenote=async(req,res)=>{
    try{
        const {noteid}=req.body;
        await notes.findByIdAndDelete(noteid);
        return res.status(200).json({
            message:"note deleted successfully",
            success:true,
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
exports.updatenote=async(req,res)=>{
    try{
        
        const{title,content,id}=req.body;
        await notes.findByIdAndUpdate(id,{title:title,content:content,updatedat:Date.now()},{new:true});
        return res.status(200).json({
            messag:"note added successfully",
            success:true,
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
exports.getnotebyid=async(req,res)=>{
    try{
        const{noteid}=req.body;
        const arr=await notes.findById(noteid);
        return res.status(200).json({
            note:arr,
            message:"notes fetched successfully",
            success:true,
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}