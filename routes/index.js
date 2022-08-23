const express = require('express');
methodOverride = require("method-override");
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const Product = mongoose.model('Product');

/*"Read" Function: show database's item(name,img,price) on the page"form from Mongodb)*/
router.get("/",(req, res)=>{
  Product.find({},(err,products)=>{
      if (err) {console.log(err);
      }else{
          res.render("form",{products: products});
      }
  }) 
})
/*"Create" Function: create new item(name,img,price) to Mongodb(product collection)*/
  router.post('/add',
  [],
  (req, res) => {
    const errors = validationResult(req);
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var newProduct = {name:name,image:image,price:price};
    if (errors.isEmpty()) {
      const product = new Product(req.body);
      product.save()
        .then(() => { res.send('added'); })
        .catch((err) => {
          console.log(err);
          res.send('Sorry! Something went wrong.');
        });
    }
  }); 

/*"Edit" Function: create new item(name,img,price) to Mongodb(product collection)*/
  router.get("/:id/edit",(req,res)=>{
    Product.findById(req.params.id,function (err, product){
        if(err){
            console.log(err);
            res.redirect("/");
        }else{
            res.render("edit",{product: product});
        }
    })
})
//Edit Put request
router.put("/:id/edit",(req, res)=>{
    Product.findByIdAndUpdate(req.params.id,req.body.product,function(err,updatedata){
        if(err){
            console.log(err);
            res.redirect("/");
        }else{
            res.redirect("/");
        }
    })
})

/*"Delete" Function: send request: "delete" item(name,img,price) to Mongodb(product collection)*/ 
router.delete("/:id",(req,res)=>{
  Product.findByIdAndRemove(req.params.id,function (err){
      if(err){
          console.log(err);
          res.redirect("/");
      }else {
          res.redirect("/");
          }
  })
})

//Set the route for /index to index.ejs
router.get('/index',(req,res)=>{
  res.render('index');
})
//Set the route for /register to register.ejs
router.get('/register',(req,res)=>{
  res.render('register');
})

//construct Registration and linke to Registration Schema
const Registration = mongoose.model('Registration');
router.get("/",(req, res)=>{
  Registration.find({},(err,products)=>{
      if (err) {console.log(err);
      }else{
          res.render("registration",{products: products});
      }
  })
  
})
  router.post('/',
  [
    check('name')
      .isLength({ min: 1 })
      .withMessage('Please enter a name'),
    check('email')
      .isLength({ min: 1 })
      .withMessage('Please enter an email'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const registration = new Registration(req.body);
      registration.save()
        .then(() => { res.send('Thank you for your registration!'); })
        .catch((err) => {
          console.log(err);
          res.send('Sorry! Something went wrong.');
        });
    }
  });  

module.exports = router;