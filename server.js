const express = require('express');
const path    = require('path');


const app = express();
const port = process.env.PORT || 3000;
const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
const Task = require('./routes/task');

//assset path
app.use(express.static(path.join(__dirname,'public')));

//root path
app.use('/',express.static(path.join(__dirname,'public')));

app.use('/api/task',Task);

//Lets listen server on port 3000
app.listen(port,()=>{
  console.log(`Server listening on ${port} path: ${baseUrl}`);
});
