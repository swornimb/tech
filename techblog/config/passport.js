var password = require('passport');
var Admin = require('../modules/admin')
var localStrategy = require('passport-local').Strategy;

password.serializeUser(function(user, done){
    done(null, user.id);
});


password.deserializeUser(function(id, done){
    Admin.findById(id,function(err,user){
        done(err, user);

    })
})

password.use('local.signin', new localStrategy({passReqToCallback: true},function(req, username, password, done){
    Admin.findOne({username:username}, function(err, user){
        if(err){
             done(err);
        }
        if(!user){
             done(null, false)
        }if(!user.verifyPassword(password)){
            done(null, false)
        }
        else{
            return done(null,user)
        }
        
    })
}))