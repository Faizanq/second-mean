const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
  title:{
    type:String,
    require:true,
  },
  description:{
    type:String,
    require:false
  },
  isCompleted:{
    type:Boolean,
    require:false,
    default:false
  }
});
const Task = mongoose.model('Task',taskSchema);
module.exports = Task;


