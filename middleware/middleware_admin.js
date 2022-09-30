const middleware = (req,res,next)=>{

    if(req.session.user != undefined)
    {
        const {user,  id} = req.session.user;

        if(user === "yrllanflamengp@gmail.com")
        {
            next();
        }
    }
    else{
        res.redirect("/login")
    }


}


module.exports = middleware