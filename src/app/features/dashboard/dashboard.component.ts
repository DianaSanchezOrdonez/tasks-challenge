import { Component } from '@angular/core';
import { Task } from './models/task.model';
import { CardComponent } from '../../core/components/card/card.component';
import { StatusEnum } from './models/task.enums';
import { Observable, map, tap } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatCardModule } from '@angular/material/card';
import { ToolbarComponent } from '../../core/components/toolbar/toolbar.component';
import { SearchComponent } from '../../core/components/search/search.component';
import { Store } from '@ngrx/store';
import { listTasks } from '../../core/store/task.actions';
import { TaskState } from '../../core/store/task.state';

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
  filterParam = '';

  allTasks$: Observable<Task[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  backlogTasks$: Observable<Task[]>;
  inProgressTasks$: Observable<Task[]>;
  doneTasks$: Observable<Task[]>;

  constructor(private store: Store<{ taskState: TaskState }>) {
    this.allTasks$ = this.store.select((state) => state.taskState.tasks);
    this.loading$ = this.store.select((state) => state.taskState.loading);
    this.error$ = this.store.select((state) => state.taskState.error);

    this.backlogTasks$ = this.allTasks$.pipe(
      map((tasks) => tasks.filter((task) => task.status === StatusEnum.BACKLOG))
    );

    this.inProgressTasks$ = this.allTasks$.pipe(
      map((tasks) =>
        tasks.filter((task) => task.status === StatusEnum.IN_PROGRESS)
      )
    );

    this.doneTasks$ = this.allTasks$.pipe(
      map((tasks) => tasks.filter((task) => task.status === StatusEnum.DONE))
    );
  }

  ngOnInit() {
    this.store.dispatch(listTasks({ filter: {} }));
  }

  receivedFilter(filter: string) {
    this.filterParam = filter;
    // console.log('this.filterCalled', this.filterParam);
    // if (this.filterParam) {
    //   this.store.dispatch(
    //     listTasks({
    //       filter: {
    //         name: filter,
    //       },
    //     })
    //   );
    // } else {
    //   this.store.dispatch(listTasks({ filter: {} }));
    // }
  }

  // loadAllTasks() {
  //   this.loadTasksByFilter({ status: StatusEnum.BACKLOG }).subscribe({
  //     next: (result) => {
  //       this.workingTasks = result.data?.tasks;
  //       this.workingLoading = result.loading;
  //     },
  //     error: (error) => {
  //       console.error('Error fetching tasks', error);
  //     },
  //   });

  //   this.loadTasksByFilter({ status: StatusEnum.IN_PROGRESS }).subscribe({
  //     next: (result) => {
  //       this.inProgressTasks = result.data?.tasks;
  //       this.inProgressLoading = result.loading;
  //     },
  //     error: (error) => {
  //       console.error('Error fetching tasks', error);
  //     },
  //   });

  //   this.loadTasksByFilter({ status: StatusEnum.DONE }).subscribe({
  //     next: (result) => {
  //       this.completedTasks = result.data?.tasks;
  //       this.completedLoading = result.loading;
  //     },
  //     error: (error) => {
  //       console.error('Error fetching tasks', error);
  //     },
  //   });
  // }

  // loadTasksByFilter(input: {
  //   name?: string;
  //   status?: StatusEnum;
  // }): Observable<ApolloQueryResult<{ tasks: Task[] }>> {
  //   return this.dataService.getTasks(input);
  // }

  // receivedFilter(filter: string) {
  //   this.filterParam = filter;
  //   console.log('this.filterCalled', this.filterParam);
  //   if (this.filterParam) {
  //     this.loadTasksByFilterForStatus(StatusEnum.BACKLOG);
  //     this.loadTasksByFilterForStatus(StatusEnum.IN_PROGRESS);
  //     this.loadTasksByFilterForStatus(StatusEnum.DONE);
  //   }
  // }

  // loadTasksByFilterForStatus(status: StatusEnum) {
  //   this.loadTasksByFilter({
  //     name: this.filterParam,
  //     status,
  //   }).subscribe({
  //     next: (result) => {
  //       if (status === StatusEnum.BACKLOG) {
  //         this.workingTasks = result.data?.tasks;
  //       } else if (status === StatusEnum.IN_PROGRESS) {
  //         this.inProgressTasks = result.data?.tasks;
  //       } else if (status === StatusEnum.DONE) {
  //         this.completedTasks = result.data?.tasks;
  //       }
  //     },
  //     error: (error) => {
  //       console.error(`Error fetching tasks for status ${status}`, error);
  //     },
  //   });
  // }
}
