import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.css']
})
export class TaskListItemComponent implements OnInit {
  task: Task = new Task();
  @Input() set taskItem(item: Task) {
    this.task = item;
  }

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {

  }

  remove(id: number){
    this.taskService.delete(id).subscribe(() => {

    });
  }
}
