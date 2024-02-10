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
  limit: number = 9;

  constructor(
    private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(){
    this.loading = true;
    this.taskService.getTasks(this.offset, this.limit).subscribe((ret)=> {
      this.tasks.push(...ret.map(e => new Task(e)));
      this.loading = false;
      this.offset += this.limit;
    });
  }

  onContainerScroll() {
    const container = document.querySelector('.tasks-container');
    if(container != null){
    const scrollPosition = container.scrollTop + container.clientHeight;
    const maxScroll = container.scrollHeight;
    if (parseInt(scrollPosition.toFixed()) + 1 === maxScroll) {
        this.loadTasks();
      }
    }
  }

}
