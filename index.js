const express=require("express")
const { connection } = require("./db")
const cors=require("cors")
const { userRoute } = require("./Route/user.route")
const { employeeRoute } = require("./Route/employees.route")
const app=express()
app.use(cors())
require("dotenv").config()
app.use(express.json())

app.use("/user",userRoute)
app.use("/employee",employeeRoute)

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Connected to DB")
    }
    catch(err){
        console.log(err)
    }
    console.log(`server is running at port ${process.env.port}`)
})