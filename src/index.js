//imports
const express = require('express');
const path = require('path');
const collection = require('./config')
const bcrypt = require('bcrypt');

//create the express application
const app = express();


//choose the port to run the server
const port = 50000;
app.listen(port , ()=>{
    console.log(`Server is running on port: ${port}`);
})