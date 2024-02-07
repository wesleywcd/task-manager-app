import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../models/task.model';
import { TaskService } from '../service/task.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  task: Task | undefined;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    let taskId = this.route.snapshot?.paramMap?.get('id');
    this.loadTask(taskId);
  }

  loadTask(id: any) {
    this.loading = true;
    this.taskService.getById(id)
      .subscribe(task => {
        this.task = task;
        this.loading = false;
      });
  }

  getModel(): Task {
    let model = new Task();

    return model;
  }

  save(){
    let model = this.getModel();

    this.taskService.post(model).subscribe((ret: any) => {
      this.notificationService.showSuccess('', 'Task saved.');
    })
  }
}
