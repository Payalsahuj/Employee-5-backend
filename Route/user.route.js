const express=require("express")
const bycrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { userModel } = require("../Model/user.model")
const userRoute=express.Router()

userRoute.post("/signup",async(req,res)=>{
    const {email,password,confirmpassword}=req.body
    try{
        const user=await userModel.findOne({email})
        if(password!==confirmpassword){
            res.status(200).json({err:'Both the password should be same'})
        }
        else if(user){
            res.status(200).json({err:'User already exist, Please Login !!'}) 
        }
        else{
            bycrypt.hash(password,5,async(err,hash)=>{
                if(err){
                    res.status(200).json({err:err.message})
                }
                else{
                    const user=new userModel({email,password:hash,confirmpassword:hash})
                    await user.save()
                    res.status(200).json({msg:'User account has been registered'})
                }
            })
        }
    }
    catch(err){
        res.status(400).json({err:err.message})
    }
})

userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await userModel.findOne({email})
        // console.log(user)
        
        if(user){
            bycrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    let token =jwt.sign({userID:user._id},process.env.secode,{expiresIn:'4d'})
                    res.status(200).json({msg:"Login Successful",token})
                }
                else{
                    res.status(200).json({err:"Wrong password"})
                }
            })
        }
        else{
            res.status(200).json({err:"Invalid Credentials"})  
        }
    }
    catch(err){
        res.status(400).json({err:err.message})
    }
})

module.exports={
    userRoute
}


// {
//     "email":"sahupayal220@gmail.com",
//     "password":"payal",
//     "confirmpassword":"payal"
//   }