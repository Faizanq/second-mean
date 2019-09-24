import { Component, OnInit,Inject,Output,EventEmitter } from '@angular/core';
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
  @Output() AddTaskEvent = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      width: '250px',
      data: {title: this.title}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.AddTaskEvent.emit();
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

  showLoader = false;
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
    this.service.AddTask(data).subscribe(responseData=>{
      this.snackbar.open(responseData.messgae,'close',{
        duration:5000
      })
    });
  }

}
