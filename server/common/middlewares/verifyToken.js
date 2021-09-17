const jtw = require("jsonwebtoken");

function verify(req,res,next){
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jtw.verify(token,process.env.SECRET_KEY,(err,user)=>{
            if(err){
                res.status(403).json("Token is not valid");
            }
            req.user = user;
           next(); 
        });
    }else{
        return res.status(401).json("Not authenticated");
    }
}


module.exports = verify;