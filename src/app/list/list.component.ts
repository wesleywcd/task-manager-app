import { Component, HostListener, OnInit } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from '../service/task.service';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  value = 50;
  limit = 3;
  offset = 0;
  loading = false;
  tasks: Task[] = [];
  loadingMore = false;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    debugger
    this.loadTasks();
    console.log('ha');
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if (this.bottomReached() && !this.loading && !this.loadingMore) {
      this.offset += this.limit;
      this.loadTasks(true);
    }
  }

  loadTasks(loadMore = false) {
    if (!loadMore) {
      this.loading = true;
    } else {
      this.loadingMore = true;
    }

    this.taskService.getTasks(this.offset, this.limit)
      .subscribe(tasks => {
        if (loadMore) {
          this.tasks.push(...tasks);
          this.loadingMore = false;
        } else {
          this.tasks = tasks;
          this.loading = false;
        }
      });
  }

  bottomReached(): boolean {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
  }
}
