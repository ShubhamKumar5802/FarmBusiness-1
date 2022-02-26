const express = require("express");
const path= require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));


app.get('/',function (req,res) {
    res.sendFile(path.join(__dirname,'index.html'))
    
})
app.get('/home',function (req,res) {
    res.render('home')
    
})

app.get('/login',function (req,res) {
    res.render('login')
})
app.get('/signup',function (req,res) {
    res.render('signup')
})

app.get('/farmerdash',function (req,res) {
    res.render('farmerdash')
})
app.get("/tandc",function (req,res) {
    res.render('TANDC');
})
app.get('/companydash',function (req,res) {
    res.render('companydash')
})

app.listen((4000 || process.env.PORT), function() {
    console.log("Server started on port 3000");
  });
  
