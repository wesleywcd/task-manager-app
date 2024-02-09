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
  constructor(private http: HttpClient) { }

  getTasks(offset: number, limit: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${environments.api}?offset=${offset}&limit=${limit}`);
  }

  getChart(): Observable<Chart[]> {
    return this.http.get<Chart[]>(`${environments.api}}/chart`);
  }

  getById(id: number): Observable<Task>{
    return this.http.get<Task>(`${environments.api}/${id}`);
  }

  save(task: Task): Observable<any>{
    if(task.id > 0)
      return this.http.put(`${environments.api}`, task);
    else
      return this.http.post(`${environments.api}`, task);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${environments.api}/${id}`);
  }
}
