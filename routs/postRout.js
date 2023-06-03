const express=require("express")
const { postModel } = require("../model/PostClassifiedsModel")

const postRout=express.Router()

postRout.get("/get/post",async (req,res)=>{
    // console.log(req.body.userID)
    let data=await postModel.find()
    res.send({mag:"here is data",data})
})



postRout.get("/:category",async (req,res)=>{
    let category=req.params.category
console.log(category)
    let post=await postModel.find({category:`${category}`})
    console.log(post)
    res.send({msg:"here is posts",post})
})



postRout.get("/find/:sort",async (req,res)=>{
    let sort=req.params.sort
console.log(sort)

if(sort=="asc"){
    let post=await postModel.find().sort({postedAt:-1})
    console.log(post)
    res.send({msg:"here is posts",post})
}else{

    let post=await postModel.find().sort({postedAt:1}) 
       console.log(post)
    res.send({msg:"here is posts",post})
}
})


postRout.get("/search/:name",async (req,res)=>{
    let name=req.params.name
// console.log(sort)

 
    let post=await postModel.aggregate([{$match:{name:name}}])
    console.log(post)
    res.send({msg:"here is posts",post})
 

    

})



postRout.post("/",async (req,res)=>{
    // name:String,
    // description:String,
    // category:{type:String,enum:["Clothing", "Electronics", "Furniture", "Other"]},
    // image:String,
    // location:String,
    // postedAt:Date,
    // price:Number
let {name,description,category,image,location,price,userID}=req.body
let date=  Date.now()
console.log(userID)
    try {
        let post=new postModel({name,description,category,image,location,postedAt:date,price,userID})
        await post.save()
        console.log(post)
        res.send({msg:"post is added",post})
    } catch (error) {
        console.log(error)
        res.send({msg:"cant add post"})
    }
})


module.exports={
    postRout
}