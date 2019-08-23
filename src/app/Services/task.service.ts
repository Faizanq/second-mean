import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskSchema } from '../Interface/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private _http:HttpClient) { }

  Task():Observable<TaskSchema[]>{
    return this._http.get<TaskSchema[]>('http://localhost:3000/api/task');
  }
  changeStatus(element):Observable<any>{
    return this._http.put<any>(`http://localhost:3000/api/task/${element._id}`,element)
  }
}
