/*const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb+srv://thembinkosidladla318:nonos2424@logindb.7uiictv.mongodb.net/?retryWrites=true&w=majority&appName=LoginDB')*/

require('dotenv').config();  //allow the config to use the dotenv file 
const mongoose = require('mongoose');    //import the mongoose
const connect = mongoose.connect(process.env.MONGODB_URI); 

//ccheck the database connection
connect.then(()=>{
    console.log('Database connected');
}).catch(()=>{
    console.log('database not connected')
})

//create the schema
const loginSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        }, 
        lastName: {
            type: String,
            require: true
        }, 
        email: {
            type: String,
            require: true
        },
        password:{
            type: String,
            require: true,
        }
    }
)

//create model colection
const collection = new mongoose.model("users", loginSchema);
 module.exports = collection;