exports.Authorization=async(req,res,next)=>{
    try{
        const present=req.cookies["token"];
        if(!present){
            return res.status(400).json({
                message:"User Not Authenticated",
                success:false,
            })
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
exports.checkauth=async(req,res)=>{
        return res.status(200).json({
            message:"User Authenticated successfully",
            success:true,
        })
}
exports.logout=async(req,res)=>{
    try{
        const options={httpOnly:true,sameSite:'none',secure:true,maxAge:0};
        res.cookie("token","",options);
        return res.status(200).json({
            message:"cookie removed successfully",
            success:true,
        })
        
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}