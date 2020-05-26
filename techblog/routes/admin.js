var express = require('express');
var router = express.Router();
var multer  = require('multer');
var path = require('path');
var session = require('express-session')
var passport = require('passport')
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
var posts = require('../modules/blog')
var admin = require('../modules/admin')


var Storage= multer.diskStorage({
    destination:"./public/uploads/",
    filename:(req,file,cb)=>{
      cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
  });
   
  var upload = multer({ storage: Storage }).single('image')


//signin

router.get('/signup', function(req, res, next) {
  res.render('admin/signup')   
});

router.post('/signup',function(req, res, next){
  bcrypt.hash("password", 5, function(err, hash) {
    var adminDetail = new admin({
      username: "swornim",
      password:hash
    })
    adminDetail.save((err, data)=>{
      res.redirect('admin/signin')
    })
  
  });
});
     

 


  
//signin

router.get('/signin', function(req, res, next) {
  res.render('admin/signin')   
});

router.post('/signin', passport.authenticate('local.signin',{
  failureRedirect: '/admin/signin',
  successRedirect: '/admin/post',
  failureFlash: true
})
);


//post
  router.get('/post',islogedin,function(req, res, next) {
    res.render('admin/post')   
});

router.post('/post',upload,function(req, res, next){
    var title = req.body.title;
    var slug = req.body.slug;
    var description = req.body.description;
    var post = req.body.editor1;
    var image = req.file.filename
    var author = req.body.author
    var category = req.body.category;
    var categoryArray = category.split(",")
   var postDetails = new posts({
        title: title,
        slug: slug,
        description: description,
        image: image,
        author: author,
        post: post,
        category:categoryArray
   })
   postDetails.save((err,data)=>{
       if(err) throw err;
       res.render('admin/post')
   });

  

})

//all post
router.get('/myposts',islogedin, function(req, res, next) {
  var viewPost = posts.find();
  viewPost.exec((err, data)=>{
    if(err) throw err;
    res.render('admin/viewpost', {data: data})
  })
  // var transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: 'swornim424@gmail.com',
  //     pass: 'Liverpoolrealmadrid'
  //   }
  // });
  
  // var mailOptions = {
  //   from: 'swornim@yahoo.com',
  //   to: 'subham014466197@gmail.com',
  //   subject: 'Sending Email using Node.js',
  //   text: 'That was easy!'
  // };
  
  // transporter.sendMail(mailOptions, function(error, info){
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log('Email sent: ' + info.response);
  //   }
  // });
});

router.get('/posts/:id', function(req, res, next) {
  var id = req.params.id
  var viewPost = posts.findById(id);
  viewPost.exec((err, data)=>{
    if(err) throw err;
    res.render('admin/editpost', {data: data})
  })
});
  router.post('/posts/:id', function(req, res, next) {
    var id = req.params.id
    var title = req.body.title;
    var description = req.body.description;
    var post = req.body.editor1;
    var image = req.file.filename
    var author = req.body.author
    var category = req.body.category;

    var viewPost = posts.findByIdAndUpdate(id,{title:title, description:description, post:post, image:image, author:author, category:category});
    viewPost.exec((err, data)=>{
      if(err) throw err;
      res.redirect('/myposts')
    })
  });   

  router.get('/logout', function(req, res, next) {
    req.logOut();
    res.redirect('/')   
  });

 





module.exports = router;

function islogedin(req, res, next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect('/admin/signin');
}
