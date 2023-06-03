var jwt = require('jsonwebtoken');
 



const auth=(req,res,next)=>{
    let token=req.headers.authorization
    if(!token){
        return res.send("please login first")
    }
console.log(typeof(token))
    jwt.verify(token, 'masai', function(err, decoded) {
        // console.log(decoded) // bar
             if(err){
                console.log(err)
                  res.send("please login first")
             }else{
                  console.log(decoded)
                 req.body.userID=decoded.userId
                 next()
             }
      });
}
module.exports={
    auth
}
