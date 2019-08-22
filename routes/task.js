const express = require('express');

const routes = express.Router();
const Task   = require('../models/task');

//Get the all task
routes.get('/',async (req,res)=>{

  let tasks = await Task.find({});

  res.json(tasks);
});


//Add the task
routes.post('/',(req,res)=>{

  let task = new Task({
    title:req.body.title,
  });

  if(task.save()){
  res.json({messgae:'Task addedd successfully'});
  }else{
    res.json({messgae:'Task not addedd'});
  }

});

//Edit the task
routes.put('/:id',async(req,res)=>{

  console.log(req.params.id,req.body);

  let task = await Task.findByIdAndUpdate(req.params.id,{
    title:req.body.title
  });

  if(task){
    res.json({messgae:'Task Updated successfully'});
    }else{
      res.json({messgae:'Task not updated or not found'});
    }
});

//Delete the task
routes.delete('/:id',async(req,res)=>{
  let task = await Task.findByIdAndDelete(req.params.id);
  if(task){
    res.json({messgae:'Task deleted successfully'});
    }else{
      res.json({messgae:'Task not Deleted or not found'});
    }
});


module.exports = routes;

