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
import { ToolbarComponent } from '../../core/components/toolbar/toolbar.component';
import { SearchComponent } from '../../core/components/search/search.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    NgxSkeletonLoaderModule,
    MatCardModule,
    ToolbarComponent,
    SearchComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  workingTasks: Task[] = [];
  workingLoading: boolean = true;
  inProgressTasks: Task[] = [];
  inProgressLoading: boolean = true;
  completedTasks: Task[] = [];
  completedLoading: boolean = true;
  filterParam = '';

  constructor(private dataService: DataService, private http: HttpClient) {}

  ngOnInit() {
    this.loadAllTasks();
  }

  loadAllTasks() {
    this.loadTasksByFilter({ status: StatusEnum.BACKLOG }).subscribe({
      next: (result) => {
        this.workingTasks = result.data?.tasks;
        this.workingLoading = result.loading;
      },
      error: (error) => {
        console.error('Error fetching tasks', error);
      },
    });

    this.loadTasksByFilter({ status: StatusEnum.IN_PROGRESS }).subscribe({
      next: (result) => {
        this.inProgressTasks = result.data?.tasks;
        this.inProgressLoading = result.loading;
      },
      error: (error) => {
        console.error('Error fetching tasks', error);
      },
    });

    this.loadTasksByFilter({ status: StatusEnum.DONE }).subscribe({
      next: (result) => {
        this.completedTasks = result.data?.tasks;
        this.completedLoading = result.loading;
      },
      error: (error) => {
        console.error('Error fetching tasks', error);
      },
    });
  }

  loadTasksByFilter(input: {
    name?: string;
    status?: StatusEnum;
  }): Observable<ApolloQueryResult<{ tasks: Task[] }>> {
    return this.dataService.getTasks(input);
  }

  receivedFilter(filter: string) {
    this.filterParam = filter;
    console.log('this.filterCalled', this.filterParam);
    if (this.filterParam) {
      this.loadTasksByFilterForStatus(StatusEnum.BACKLOG);
      this.loadTasksByFilterForStatus(StatusEnum.IN_PROGRESS);
      this.loadTasksByFilterForStatus(StatusEnum.DONE);
    } else {
      this.loadAllTasks();
    }
  }

  loadTasksByFilterForStatus(status: StatusEnum) {
    this.loadTasksByFilter({
      name: this.filterParam,
      status,
    }).subscribe({
      next: (result) => {
        if (status === StatusEnum.BACKLOG) {
          this.workingTasks = result.data?.tasks;
        } else if (status === StatusEnum.IN_PROGRESS) {
          this.inProgressTasks = result.data?.tasks;
        } else if (status === StatusEnum.DONE) {
          this.completedTasks = result.data?.tasks;
        }
      },
      error: (error) => {
        console.error(`Error fetching tasks for status ${status}`, error);
      },
    });
  }
}
