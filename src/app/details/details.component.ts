import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../models/task.model';
import { TaskService } from '../service/task.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  task: Task = new Task();
  loading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TaskService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    let taskId = this.route.snapshot?.paramMap?.get('id');

    if(taskId != '0')
      this.loadTask(taskId);
  }

  goBack(){
    this.router.navigate(['/tasks']);
  }

  loadTask(id: any) {
    this.loading = true;
    this.taskService.getById(id)
      .subscribe(task => {
        this.task = task;
        this.loading = false;
      });
  }

  validForm() {
    if(this.task?.title !== null)
      this.notificationService.showWarning('Title is mandatory');
    else
      this.save();
  }

  save(){
    let model = this.task;

    this.taskService.post(model).subscribe((ret: any) => {
      this.notificationService.showSuccess('Task saved.');
    })
  }
}
