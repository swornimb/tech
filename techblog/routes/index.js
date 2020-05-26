var express = require('express');
var router = express.Router();

var posts = require('../modules/blog');
var Messege = require('../modules/contact');
/* GET home page. */
router.get('/', function(req, res, next) {
  var postdetails = posts.find();
  postdetails.exec((err, data)=>{
    if(err) throw err;
  res.render('all/index', {alldata: data})
  })
  
});
router.get('/article/:slug', function(req, res, next) {
  var slug = req.params.slug;
  var payload = posts.findOne({slug: slug});
  payload.exec((err,data)=>{
    if(err) throw err;
    res.render('all/template', {onedata:data})
  })    
});




router.get('/articles/:category', function(req, res, next) {
  var category = req.params.category;
  var payload = posts.find({category: category});
  payload.exec((err,data)=>{
    if(err) throw err;
    res.render('all/category', {category:data})
  })    
});

router.get('/news', function(req, res, next) {
  var category = "News"
  var payload = posts.find({category: category});
  payload.exec((err,data)=>{
    if(err) throw err;
    res.render('all/category', {category:data})
  })    
});

router.get('/apple', function(req, res, next) {
  var category = "Apple"
  var payload = posts.find({category: category});
  payload.exec((err,data)=>{
    if(err) throw err;
    res.render('all/category', {category:data})
  })    
});

router.get('/phones', function(req, res, next) {
  var category = "Phone"
  var payload = posts.find({category: category});
  payload.exec((err,data)=>{
    if(err) throw err;
    res.render('all/category', {category:data})
  })    
});

router.get('/gadgets', function(req, res, next) {
  var category = "Gadgets"
  var payload = posts.find({category: category});
  payload.exec((err,data)=>{
    if(err) throw err;
    res.render('all/category', {category:data})
  })    
});

router.get('/laptops', function(req, res, next) {
  var category = "Laptop"
  var payload = posts.find({category: category});
  payload.exec((err,data)=>{
    if(err) throw err;
    res.render('all/category', {category:data})
  })    
});

router.get('/contacts', function(req, res, next) {
  res.render('all/contacts')
});

router.post('/contacts', function(req, res, next) {
  var messagepost = new Messege({
    name:req.body.name,
    email:req.body.email,
    messege:req.body.messege
  })
  messagepost.save((err, done)=>{
    if(err) throw err
    res.redirect('/contact')
  })

});
module.exports = router;
