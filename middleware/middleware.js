
//this function is responsible for ensuring that only connected people have access to any routes
const middleware = (req,res,next)=>{

    if(req.session.user != undefined)
    {
        next();
    }
    else{
        res.redirect("/login")
    }


}


module.exports = middleware