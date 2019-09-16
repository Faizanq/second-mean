const express = require('express');
const path    = require('path');
const mongoose = require('mongoose');
const cors     = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
const Task = require('./routes/task');

//assset path
app.use(express.static(path.join(__dirname,'public')));

//root path
app.use('/',express.static(path.join(__dirname,'public')));


//Enable cors
app.use(cors());
//Lets accept the post data
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Lets establish the database connection
mongoose.connect('mongodb://localhost:27017/second-mean-db',{
  useNewUrlParser:true,
},function(err){
  if(err){
    console.log(err);
    console.log('Database not connected');
    process.exit();
  }
  console.log('Database conneted successfully');
})

app.use('/api/task',Task);

//Lets listen server on port 3000
app.listen(port,()=>{
  console.log(`Server listening on ${port} path: ${baseUrl}`);
});
