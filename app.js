//jshint esversion:6
//userschema ki plugin chesinatu migatavatiki kuda cheyala vadha
require('dotenv').config();
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const _ = require('lodash');

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(express.urlencoded({
  extended: true
}));

app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb+srv://sunny:Test123@cluster0.txpui.mongodb.net/sunnywebpageDB",{useNewUrlParser:true, useUnifiedTopology:true,useFindAndModify: false});
mongoose.set("useCreateIndex", true);

const itemsSchema = new mongoose.Schema({
    name:String
})

const userSchema = new mongoose.Schema ({
    username: String,
    password: String,
    googleId: String,
    items:[itemsSchema]
    
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);
const Items = new mongoose.model("Items",itemsSchema);


passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "https://frozen-spire-72274.herokuapp.com/auth/google/sunnywebpage",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);

    User.findOrCreate({ googleId: profile.id,username:profile.displayName }, function (err, user) {
      return cb(err, user);
    });
  }
));


app.get("/webpage",(req,res)=>{
    res.render("homepage")
})

app.get("/weather",(req,res)=>{
    res.render("weather")
})

app.get("/map",(req,res)=>{
    res.render("map")
})

app.get("/btimer",(req,res)=>{
    res.render("btimer")
})

app.get("/timer",(req,res)=>{
    res.render("timer")
})

  app.get("/",(req,res)=>{
    res.render("register",{action:"/login",pagename:"Login",headername:"Sign In",display:"display"});
})

app.get("/signup",(req,res)=>{
  res.render("register",{action:"/register",pagename:"Register",headername:"Sign Up",display:"displayNone"});
})


app.get("/Home",(req,res)=>{
  res.render("btimerclone")
})

app.get("/auth/google",passport.authenticate("google", { scope: ["profile"] }));

app.get("/auth/google/sunnywebpage", passport.authenticate("google", { failureRedirect: "/" }),function(req, res) {
    console.log(req.user);
    res.redirect("/webpage");
});

app.post("/login",(req,res)=>{
  const user = new User({
      username: req.body.username,
      password: req.body.password
    });
  
    req.login(user, function(err){
      if (err) {
        alert("Try to enter correct username and password! If you don't have account signup and enjoy!!");
        console.log(err);
        res.redirect("/login");
      } else {
        passport.authenticate("local")(req, res, function(){
          res.redirect("/webpage");
        });
      }
    });
})



app.post("/register",(req,res)=>{
  User.register({username: req.body.username}, req.body.password, function(err, user){
      if (err) {
        console.log(err);
        res.redirect("/signup");
      } else {
        passport.authenticate("local")(req, res, function(){
          res.redirect("/webpage");
        });
      }
    });
})



app.post("/Home",(req,res)=>{
    const newItem = _.capitalize(req.body.newItem);
    const tempitem = new Items({
        name:newItem
    })
    const user_id = req.user.id;
    User.findById(user_id,(err,foundItems)=>{
      foundItems.items.push(tempitem);
      foundItems.save(()=>{
      res.redirect("/Home")
      });
      
  })
})

app.post("/delete",(req,res)=>{
  const id = req.body.checkbox;
  const user_id = req.user.id;
  User.findById(user_id,(err,foundItems)=>{
      for(let i =0 ;i<foundItems.items.length;i++){
          if(foundItems.items[i]._id==id){
              foundItems.items.splice(i,1);
              foundItems.save(()=>{
                  res.redirect("/Home")
              })
          }
      }
  })
  
  
})

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
  });
  

app.listen(process.env.PORT||3000,()=>{
  console.log("server started at 3000");
})



