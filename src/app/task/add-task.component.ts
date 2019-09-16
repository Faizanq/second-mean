import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TaskService } from '../Services/task.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  title: string;

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      width: '250px',
      data: {title: this.title}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  ngOnInit() {
  }

}

export interface DialogData {
  title: string;
}


@Component({
  selector: 'add-task-dialog',
  templateUrl: 'add-task-dialog.component.html',
})
export class AddTaskDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service:TaskService,
    private snackbar:MatSnackBar
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  AddTask(data){
    console.log(data);
    this.service.AddTask(data).subscribe(responseData=>{
      this.snackbar.open(responseData.messgae,'close',{
        duration:5000
      })
    });

  }

}
