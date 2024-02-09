import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  loading: boolean = false;
  offset: number = 0;
  limit: number = 3;

  constructor(
    private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(){
    this.loading = true;
    this.taskService.getTasks(0,9).subscribe((ret)=> {
      this.tasks.push(...ret.map(e => new Task(e)));
      this.loading = false;
      this.offset += this.limit;
    });
  }

  onContainerScroll() {
    const container = document.querySelector('.tasks-container');
    if(container != null){
      if (container.scrollHeight - container.scrollTop === container.clientHeight && !this.loading) {
        this.loadTasks();
      }
    }
  }

}
