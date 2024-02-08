import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
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
  public value = 50;
  public limit = 3;
  public offset = 0;
  public plotly: any;
  public loading = false;
  public tasks: Task[] = [];
  public loadingMore = false;
  public pieChartData: number[] = [];
  public pieChartLabels: string[] = [];
  public color: ThemePalette = 'primary';
  public mode: ProgressSpinnerMode = 'determinate';

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
          this.loading = false;
          this.prepareChartData();
        } else {
          this.tasks = tasks;
          this.loading = false;
        }
      });
  }

  prepareChartData() {
    this.taskService.getChart()
      .subscribe((list) => {
        this.pieChartLabels = Array.from(list.map((x)=> { return x.key}));
        this.pieChartData = Array.from(list.map((x)=> { return x.value}));
      });

    var data = [{
      values: this.pieChartData,
      labels: this.pieChartLabels,
      type: 'pie'
    }];
    var layout = {
      height: 400,
      width: 500
    };

    this.plotly.newPlot('divChart', data, layout);
  }

  bottomReached(): boolean {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
  }

  getNamePriority(value: number): string {
    if(value == 0)
      return 'Low';
    else if(value == 1)
      return 'Medium';
    else
      return 'High';
  }

}
