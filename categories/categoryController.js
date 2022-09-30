const Categories = require("./category");
const Expense = require("../expenses/expense")
const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const { render } = require("express/lib/response");
const middleware = require("../middleware/middleware")


//this route are only accessible to admin

router.get("/admin/categories", middleware, (req,res)=>{

    Categories.findAll().then((categories)=>{
        res.render("admin/categories/index",{
            categories: categories
        });
    })

})

router.post("/admin/categories/save", middleware, (req,res)=>{

    const title = req.body.title;

    Categories.create({
        title:title,
        slug: slugify(title)
    }).then(()=>[
        res.redirect("/admin/categories")
    ])

})

router.get("/admin/categories/new", middleware, (req,res)=>{

    res.render("admin/categories/new");

})




module.exports = router;