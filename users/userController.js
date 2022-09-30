const Sequelize = require("sequelize");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("./user");


const middleware = require("../middleware/middleware");




router.get("/login", (req, res) => {
  let logged = false;

  if (req.session.user != undefined) {
    logged = true;
    res.redirect("/user/expenses")
    
  }
    
  res.render("login", {
    logado: logged,
    title: "Login"
    
  });
});

router.post("/authenticate", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //checking whether the user exists
  User.findOne({
    where: {
      email: email,
    },
  })
    //comparing password hashs
    .then((user) => {
      const correct = bcrypt.compare(password, user.password);

      if (correct) {
        //
        req.session.user = {
          user: email,
          id: user.id,
        };
        res.redirect("/user/expenses");
      } else {
        res.redirect("/register");
      }
    });
}); 

router.get("/register", (req, res) => {
    let logged = false;

  if (req.session.user != undefined) {
    logged = true;
  }
  res.render("register",{
      logado: logged,
      title: "Register now"
  });
});

router.post("/register/save", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({
    where:{
        email:email
    }
}).then( account =>{

    if(account == undefined)
    {
      //generating a hash for the password before saving to the database and add salt
        const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);

User.create({
 
    email: email,
    password: hash
}).then(()=>{
    res.redirect("/login");
})
.catch(erro =>{
    res.send("erro")
})
    }
    else{
        res.redirect("/login");
    }

})
  });


router.get("/logout",(req,res)=>{
    req.session.user = undefined;

    res.redirect("/")
})

//main expense route

router.get("/user/expenses", (req, res) => {

        res.render("user/expenses/index")
});
//


module.exports = router;
