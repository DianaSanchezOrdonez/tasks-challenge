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
import { ApolloQueryResult } from '@apollo/client';

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
    this.loadTasksByStatus(StatusEnum.BACKLOG).subscribe({
      next: (result) => {
        this.workingTasks = result.data?.tasks;
      },
      error: (error) => {
        console.error('Error fetching tasks', error);
      }
    });

    this.loadTasksByStatus(StatusEnum.IN_PROGRESS).subscribe({
      next: (result) => {
        this.inProgressTasks = result.data?.tasks;
      },
      error: (error) => {
        console.error('Error fetching tasks', error);
      }
    });

    this.loadTasksByStatus(StatusEnum.DONE).subscribe({
      next: (result) => {
        this.completedTasks = result.data?.tasks;
      },
      error: (error) => {
        console.error('Error fetching tasks', error);
      }
    });
  }

  loadTasksByStatus(status: StatusEnum): Observable<ApolloQueryResult<{ tasks: Task[] }>> {
    return this.dataService.getTasks({ status });
  }
}
