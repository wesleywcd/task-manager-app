import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { Chart } from '../models/chart.model';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  baseUrl: string = environments.api + 'tasks'
  constructor(private http: HttpClient) { }

  getTasks(offset: number, limit: number, priority: number, status: number): Observable<Task[]> {
    let filter = '';
    if(priority > -1) filter+= `&priority=${priority}`;
    if(status > -1) filter+= `&status=${status}`;
    return this.http.get<Task[]>(`${this.baseUrl}?offset=${offset}&limit=${limit}${filter}`);
  }

  getChart(): Observable<Chart[]> {
    return this.http.get<Chart[]>(`${this.baseUrl}}/chart`);
  }

  getById(id: number): Observable<Task>{
    return this.http.get<Task>(`${this.baseUrl}/${id}`);
  }

  save(task: Task): Observable<any>{
    if(task.id > 0)
      return this.http.put(`${this.baseUrl}`, task);
    else
      return this.http.post(`${this.baseUrl}`, task);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
