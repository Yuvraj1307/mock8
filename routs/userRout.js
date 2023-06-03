const express=require("express")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { userModel } = require("../model/userModel")

const userRout=express.Router()


userRout.post("/signup",async (req,res)=>{
    let {email,pass}=req.body
    try {
        bcrypt.hash(pass, 5,async function(err, hash) {
            // Store hash in your password DB.
            if(err){
                console.log(err)
                res.status(404).send("cant register")
            }else{

                let user=new userModel({
                    email,pass:hash
                });
                await user.save()
                console.log(user)
                res.status(200).send({msg:"user is registered",user})
            }
        })

        
    } catch (error) {
        console.log("cant register")
        res.status(404).send({msg:"cant register"})
    }
})


userRout.post("/login",async (req,res)=>{
    let {email,pass}=req.body
    try {
      let user=await userModel.findOne({email})

      if(!user){
        return res.status(404).send({msg:"please register first"})
      }

      bcrypt.compare(pass, user.pass, function(err, result) {
        if(result == true){
            var token = jwt.sign({userId:user._id}, 'masai');

            res.status(201).send({msg:"loginsuccess",token})

        }else{
            console.log(err)
            res.send("cant find user")
        }
    });
        
        
        
    } catch (error) {
        console.log("cant register")
        res.status(404).send({msg:"cant register"})
    }
})

module.exports={
    userRout
}