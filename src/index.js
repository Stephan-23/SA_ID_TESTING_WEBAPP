//imports
const express = require('express');
const path = require('path');
const collection = require('./config')
const bcrypt = require('bcrypt');

//create the express application
const app = express();
app.use(express.json());   //convert te data to the JSON

app.use(express.static("public"))

app.use(express.urlencoded({ extended: false }))
//set ejs as view engine, go to for view and render the ejs files as html
app.set('view engine', 'ejs')

app.get(('/'), (req, res)=>{
    res.render('Login')// render the login page.
})

app.get(('/Signup'), (req, res)=>{
    res.render('Signup')// render the Signup page.
})



//choose the port to run the server
const port = 5000;
app.listen(port , ()=>{
    console.log(`Server is running on port: ${port}`);
})