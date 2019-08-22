import { Component, OnInit , ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { TaskService } from '../Services/task.service';
import { TaskSchema } from '../Interface/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  displayedColumns: string[] = ['_id', 'title', 'isCompleted'];
  dataSource:MatTableDataSource<TaskSchema>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private taskService:TaskService) {
    this.taskService.Task().subscribe(responseData=>{
      this.dataSource = new MatTableDataSource<TaskSchema>(responseData);
    })
   }

  ngOnInit() {

    this.dataSource.paginator = this.paginator;
  }

}


