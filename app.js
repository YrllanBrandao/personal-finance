const express = require("express");
const categoriesController = require("./categories/categoryController");
const expenseController = require("./expenses/expenseController");
const categories = require("./categories/category");
const userController = require("./users/userController");
const expenses = require("./expenses/expense");
const Sequelize = require("sequelize");
const session = require("express-session");
const YOURKEY = ""



const app = new express();

app.use(session({
    secret:YOURKEY,
    cookie:{
        maxAge: 600000000
    }
}))

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    let logged = false
    if(req.session.user != undefined)
    {
     logged = true;
    }
  res.render("index",{
      logado: logged,
      title: "Home"
  });
});

app.use("/", categoriesController);
app.use("/", expenseController);

app.use("/", userController);

app.listen(8080, () => {
  console.log("serve on");
});
