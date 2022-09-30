const slugify = require("slugify");
const Expenses = require("./expense");
const Categories = require("../categories/category");
const express = require("express");
const router = express.Router();
const middleware = require("../middleware/middleware");



//rotas relacionas as despesas
router.get("/user/expenses", middleware, (req, res) => {
  const limit = 4
  const { user, id } = req.session.user;
  Expenses.findAndCountAll({
    where:{
        owner: user

    }
    ,
    limit:5
}).then((expense) => {
    
        Categories.findAll().then((categories)=>{
            res.render("user/expenses/index", {
                expenses: expense,
                categories: categories,
                count: expense.count,
                title: "all expenses"

                
              });
        })

  });
});

//this route lists the expenses with limitation for paging
router.get("/user/expenses/page/:num",middleware,(req,res)=>{

    const page = Number(req.params.num);
    let offset = 0;
    const limit = 5;
    if(isNaN(page) || page == 1)
    {
      offset = 0;
    }
    else{
      offset = (Number(page)-1)*5;
    }


    Expenses.findAndCountAll({
      limit: limit,
      offset: offset
    }).then((expenses)=>{
      let next;

      if(offset+limit > expenses.count)
      {
        next = false;
      }
      else{
        next = true;
      }
      const  result =  {
        expenses: expenses,
        next: next
      }
      res.render("user/expenses/index_page", {
        result: result,
        page: page,
        title: "all expenses"
        
      });
      
      





    })

})

router.get("/user/expenses/new", middleware, (req, res) => {
  Categories.findAll().then((categories) => {
    Categories.findAll();
    res.render("user/expenses/new", {
      categories: categories,
      title: "new expense"
    
    });
  });
});

router.post("/user/expenses/save",middleware,(req, res) => {
  const {title, valueExpense, date, category,description} = req.body;
 
  const { user, id } = req.session.user;

  Expenses.create({
    title: title,
    value: valueExpense,
    description: description,
    category: category,
    date: date,
    owner: user,
  }).then(() => [res.redirect("/user/expenses")]);
});



router.get("/user/expenses/delete/:id", middleware, (req, res) => {
  const { user, id } = req.session.user;
  const idExpense = req.params.id;

  Expenses.findOne({
    where: {
      id: idExpense,
      owner: user,
    },
  }).then((expense) => {
    if (expense != undefined) {
      Expenses.destroy({
        where: {
          id: idExpense,
          owner: user,
        },
      }).then(() => {
        res.redirect("/user/expenses");
      });
    } else {
    }
  });
});

module.exports = router;
