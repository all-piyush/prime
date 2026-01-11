const userschema=require('../models/loginschema');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
exports.Login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({
            success:false,
            message:"Password or Email not entered"
        })
        }
        const user=await userschema.findOne({email});
        if(!user){
            return res.status(400).json({
            success:false,
            message:"No user found"
        })
        }
        const result=await bcrypt.compare(password,user.password);
        if(!result){
            return res.status(400).json({
                message:"Password didn't matched",
                success:false,
            })
        }
        const options={httpOnly:true,sameSite:'None',secure:true,maxAge:7*24*60*60*1000};
        const secret=process.env.JWT_SECRET;
        const payload={email:email,id:user._id};
        const token=jwt.sign(payload,secret,{expiresIn:'7d'});
        if(!token ){
            return res.status(400).json({
                message:"Token not present",
                success:false,
            })
        }
        res.cookie('token',token,options);
        return res.status(200).json({
            message:"user logged in successfully",
            success:true,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
exports.Signup=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        if(!name || !email || !password){
            return res.status(400).json({
            success:false,
            message:"Password or Email or Name not entered"
        })
        }
        const user=await userschema.findOne({email});
        if(user){
            return res.status(400).json({
            success:false,
            message:"user already present"
        })
        }
        const hashedpassword=await bcrypt.hash(password,10);
        const newuser=await userschema.create({name:name,email:email,password:hashedpassword});
        const options={httpOnly:true,sameSite:'none',secure:true,maxAge:7*24*60*60*1000};
        const secret=process.env.JWT_SECRET;
        const payload={name:name,email:email,id:newuser._id};
        const token=jwt.sign(payload,secret,{expiresIn:'7d'});
        
        res.cookie('token',token,options);
        return res.status(200).json({
            user:newuser,
            message:"User Created Successfully",
            success:true,
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
exports.googlelogin=async(req,res)=>{
    try{
        const{name,email,googleid}=req.body;
        if(!name ||!email || !googleid ){
            return res.status(400).json({
            success:false,
            message:"Name or Email or googleid not entered"
        })
        }
        let user=await userschema.findOne({email});
        if(user && user.googleid!==googleid){
            return res.status(400).json({
                success:false,
                message:"google account mismatch"
            })
        }
        if(!user){
         user=await userschema.create({name:name,email:email,googleid:googleid});}
        const options={httpOnly:true,sameSite:'none',secure:true,maxAge:7*24*60*60*1000};
        const secret=process.env.JWT_SECRET;
        const payload={name:name,email:email,id:user._id};
        const token=jwt.sign(payload,secret,{expiresIn:'7d'});
        res.cookie('token',token,options);
        return res.status(200).json({
            message:"Google Login Successfully",
            success:true,
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
