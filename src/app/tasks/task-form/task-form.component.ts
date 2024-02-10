import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { NotificationService } from 'src/app/service/notification.service';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  task: Task = new Task();
  title: string = 'New Task';

  constructor(
    private router: Router,
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute
    ) {}

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if(id){
      this.taskService.getById(parseInt(id)).subscribe((ret) => {
        this.title = 'Edit Task';
        this.task = ret;
      })
    }
  }

  onSubmit() {
    let model = this.task;
    model.priority = parseInt(this.task.priority.toString());
    model.status = parseInt(this.task.status.toString());

    this.taskService.save(model).subscribe((ret) => {
      this.router.navigate(['']);
    });
  }
}
