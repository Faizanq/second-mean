const express = require('express');

const routes = express.Router();


routes.get('/',(req,res)=>{
  res.json({messgae:'Task list'});
});

routes.post('/',(req,res)=>{
  res.json({messgae:'Post Task list'});
});

routes.put('/:id',(req,res)=>{
  res.json({messgae:`Edit Task of ${req.params.id}`});
});

routes.delete('/:id',(req,res)=>{
  res.json({messgae:`Delete Task of ${req.params.id}`});
});


module.exports = routes;

