const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const app = express();


//dotenv
require('dotenv').config();

//middlewares
app.use('/uploads',express.static('uploads'));
app.use(cors());
app.use(express.json());

// mongo uri important boilerplate
//ATLAS_URI is the uri that i got from my mongo atlas, written on the env file
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//routes
app.use('/',require('./routes/index'))
app.use('/users',require('./routes/users'))

//port
const PORT = process.env.PORT || 8080

app.listen(PORT, function(){
  console.log(`server has started on ${PORT}`)
})

