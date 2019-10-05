import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from '../Services/task.service';
import { TaskSchema } from '../Interface/task';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  displayedColumns: string[] = ['_id', 'title', 'isCompleted', 'Actions'];
  dataSource: MatTableDataSource<TaskSchema>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private taskService: TaskService, private snackbar: MatSnackBar) {

  }

  ngOnInit() {
    this.getTaskList();
  }

  getTaskList() {
    this.taskService.Task().subscribe(responseData => {

      this.dataSource = new MatTableDataSource<TaskSchema>(responseData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  changeStatus(element) {
    element.isCompleted = element.isCompleted == true ? false : true;
    this.taskService.changeStatus(element).subscribe(responseData => {
      this.snackbar.open(responseData.messgae, 'close', {
        duration: 5000
      })
      console.log(responseData.messgae);
    });
  }

  deleteTask(element) {
    let check = confirm('Are you sure?');
    if (check) {
      let id = element._id;
      this.taskService.DeleteTask(id).subscribe(responseData => {
        this.snackbar.open(responseData.messgae, 'close', {
          duration: 5000
        })
        this.getTaskList();
      });
    }
  }

  RefreshTaskList(event){
    this.getTaskList();
  }

}


