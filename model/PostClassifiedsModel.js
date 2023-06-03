const mongoose=require("mongoose")

const postSchema=mongoose.Schema({
    name:String,
    description:String,
    category:{type:String,enum:["Clothing", "Electronics", "Furniture", "Other"]},
    image:String,
    location:String,
    postedAt:Date,
    price:Number,
    userID:mongoose.Schema.Types.ObjectId
})

const postModel=mongoose.model("post",postSchema)

module.exports={
    postModel
}