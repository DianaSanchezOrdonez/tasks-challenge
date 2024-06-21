import { Component } from '@angular/core';
import { Task } from './models/task.model';
import { DataService } from '../../core/services/data.service';
import { CardComponent } from '../../core/components/card/card.component';
import { HttpClient } from '@angular/common/http';
import { StatusEnum } from './models/task.enums';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    NgxSkeletonLoaderModule,
    MatCardModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  workingTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  completedTasks: Task[] = [];

  constructor(private dataService: DataService, private http: HttpClient) {}

  ngOnInit() {
    this.loadTasksByStatus(StatusEnum.BACKLOG).subscribe((result) => {
      this.workingTasks = result;
    });

    this.loadTasksByStatus(StatusEnum.IN_PROGRESS).subscribe((result) => {
      this.inProgressTasks = result;
    });

    this.loadTasksByStatus(StatusEnum.DONE).subscribe((result) => {
      this.completedTasks = result;
    });
  }

  loadTasksByStatus(status: StatusEnum): Observable<Task[]> {
    const params = { key: 'status', value: status };
    return this.dataService.getTasks(params);
  }
}
