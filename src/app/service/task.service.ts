import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:5108/api/tasks';

  constructor(private http: HttpClient) { }

  getTasks(offset: number, limit: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}?offset=${offset}&limit=${limit}`);
  }

  getById(id: number): Observable<Task>{
    return this.http.get<Task>(`${this.baseUrl}/${id}`);
  }

  post(task: Task): Observable<any>{
    return this.http.post(this.baseUrl, task);
  }

  put(task: Task): Observable<any>{
    return this.http.put(this.baseUrl, task);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
