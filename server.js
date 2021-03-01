const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

// Passport Config
require('./config/passport')(passport);

//dotenv
require('dotenv').config();

//middlewares
app.use('/uploads',express.static('uploads'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:false}));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables to implement flash messages
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//EJS
app.use(expressLayouts);
app.set('view engine','ejs');



// mongo uri important boilerplate
//ATLAS_URI is the uri that i got from my mongo atlas, written on the env file
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true })
.then(()=>{
  console.log("MongoDB database connection established successfully");
})
.catch(error=>{
  console.log(error);
})
// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log("MongoDB database connection established successfully");
// })

//routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));

//port
const PORT = process.env.PORT || 8080

app.listen(PORT, function(){
  console.log(`server has started on ${PORT}`)
})

