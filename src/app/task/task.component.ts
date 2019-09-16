import { Component, OnInit , ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';
import { TaskService } from '../Services/task.service';
import { TaskSchema } from '../Interface/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  displayedColumns: string[] = ['_id', 'title', 'isCompleted','Actions'];
  dataSource:MatTableDataSource<TaskSchema>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private taskService:TaskService,private snackbar:MatSnackBar) {

   }

  ngOnInit() {
    this.taskService.Task().subscribe(responseData=>{

      this.dataSource = new MatTableDataSource<TaskSchema>(responseData);
      this.dataSource.paginator = this.paginator;
    })
  }

  changeStatus(element){
    element.isCompleted = element.isCompleted == true ? false:true;
    this.taskService.changeStatus(element).subscribe(responseData=>{
      this.snackbar.open(responseData.messgae,'close',{
        duration:5000
      })
      console.log(responseData.messgae);
    });
  }

  deleteTask(element){
    let id = element._id;
    this.taskService.DeleteTask(id).subscribe(responseData=>{
      console.log(responseData);
      this.snackbar.open(responseData.messgae,'close',{
        duration:5000
      })
    });
  }

}


