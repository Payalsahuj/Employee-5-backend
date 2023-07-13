const express=require("express")
const { employeeModel } = require("../Model/employee.model")
const employeeRoute=express.Router()

employeeRoute.post("/employees",async(req,res)=>{
    try{
        const emplo=new employeeModel(req.body)
        await emplo.save()
        res.status(200).json({msg:'New employee has been added',employee:req.body})
    }
    catch(err){
        res.status(400).json({err:err.message})
    }
})

employeeRoute.get("/",async(req,res)=>{
    try{
        const data=await employeeModel.find()
        res.status(200).json({msg:data})
    }
    catch(err){
        res.status(400).json({err:err.message})
    }
})



module.exports={
    employeeRoute
}