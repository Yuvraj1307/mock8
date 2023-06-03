const express=require("express")
const { connection } = require("./config/db")
const { userRout } = require("./routs/userRout")
const cors=require("cors")
const { auth } = require("./middleware/auth")
const { postRout } = require("./routs/postRout")
const app=express()
app.use(express.json())
app.use(cors({origin:"*"}))
app.get("/",(req,res)=>{
    res.send("helloo")
})

app.use("/",userRout)


// app.use(auth)


app.use("/post",postRout)

app.listen(4500,async ()=>{
    try {
        await connection
        console.log("connected to DB at 4500")
    } catch (error) {
        console.log("cant connect ")
        console.log(error)
    }
})