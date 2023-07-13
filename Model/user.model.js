const mongoose=require("mongoose")

const uerSchema=mongoose.Schema({
    email:String,
    password:String,
    confirmpassword:String
},{
    versionKey:false
})

const userModel=mongoose.model("user",uerSchema)

module.exports={
    userModel
}
