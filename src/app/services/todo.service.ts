import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable()
export class TodoService {

  baseUrl = '/api/lists/';

  constructor( private http: HttpClient) { }

  loadAllList(): Observable<Array<Todo>> {
    return this.http.get<Array<Todo>>(this.baseUrl);
  }

  addNewTask(newTask: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.baseUrl, newTask);
  }

  update(task: Todo): Observable<any> {
    return this.http.put(this.baseUrl + task.id, task);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + id);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }

  markAllComplete(): Observable<any> {
    return this.http.get(this.baseUrl + 'markComplete');
  }
}
