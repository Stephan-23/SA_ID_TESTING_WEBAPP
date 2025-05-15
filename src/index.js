//imports
const express = require('express');
const path = require('path');
const collection = require('./config')
const bcrypt = require('bcrypt');
require('dotenv').config();
const { name } = require('ejs');

//create the express application
const app = express();
app.use(express.json());   //convert the data to the JSON
app.use(express.static(path.join(__dirname, '../public')));
//app.use(express.static("public"))

app.use(express.urlencoded({ extended: false }))
//set ejs as view engine, go to for view and render the ejs files as html
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../views')); 

// Routes
app.get(('/'), (req, res)=>{
    res.render('login')// render the login page.
})

app.get(('/signup'), (req, res)=>{
    res.render('signup')// render the Signup page.
})


//post method for signup(create the new user)
app.post('/signup', async (req, res)=>{

    //get the data from the user 
    const data = {
        name: req.body.Username,
        LastName: req.body.LastName,
        email: req.body.email,
        password: req.body.Password
    }

    const confirmPassword = req.body.confirmPassword;
    const ageCheck = req.body.ageCheck;

    // Validate password match
    if (data.password !== confirmPassword) {
        return res.send('Passwords do not match');
    }

    // Validate age checkbox
    if (!ageCheck) {
        return res.send('You must confirm you are over 18 to sign up');
    }

    //check if the user exist
    const userExist = await collection.findOne({email: data.email})
    if(userExist){
        res.send('USER ALREADY EXISTING IN THE DATABASE')
    }
    else{
        //create the user
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRound)
        data.password = hashedPassword;

        const userdata = await collection.insertMany(data);
        res.redirect('/');
        console.log(userdata);
    }

})
//post for login
app.post('/login', async (req, res)=>{
    try{
        const existingUserEmail = await collection.findOne({name: req.body.name})
        if(!existingUserEmail){
            res.send('User not found. Please Signup!')
            
        }

        //if the user found check that the password match
        const passwordCheck = await bcrypt.compare(req.body.Password, existingUserEmail.password);
        if(!passwordCheck){
            res.send('Wrong Password');
        }else{
            res.render('home');
        }

    }catch{
        res.send("Wrong Details");
    }

})

//choose the port to run the server
const port = process.env.PORT || 5000; 
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

// Export the app for Vercel
module.exports = app;