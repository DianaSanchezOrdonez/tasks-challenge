import { Component } from '@angular/core';
import { Task } from './models/task.model';
import { CardComponent } from '../../core/components/card/card.component';
import { StatusEnum } from './models/task.enums';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatCardModule } from '@angular/material/card';
import { ToolbarComponent } from '../../core/components/toolbar/toolbar.component';
import { SearchComponent } from '../../core/components/search/search.component';
import { Store } from '@ngrx/store';
import { listTasks, resetLoading } from '../../core/store/task.actions';
import { TaskState } from '../../core/store/task.typos';
import {
  selectAllTasks,
  selectFilteredTasks,
  selectTaskError,
  selectTaskLoading,
} from '../../core/store/task.selectors';

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
  loading$!: Observable<boolean>;
  error$: Observable<any>;

  backlogTasks$!: Observable<Task[]>;
  inProgressTasks$!: Observable<Task[]>;
  doneTasks$!: Observable<Task[]>;

  constructor(private store: Store<{ taskState: TaskState }>) {
    this.allTasks$ = this.store.select(selectAllTasks);
    this.loading$ = this.store.select(selectTaskLoading);
    this.error$ = this.store.select(selectTaskError);

    this.setTaskStreams();
  }

  ngOnInit() {
    this.store.dispatch(listTasks({ }));
    this.store.dispatch(resetLoading())
  }

  receivedFilter(filter: string) {
    this.filterParam = filter;
    this.setTaskStreams();
  }

  setTaskStreams() {
    this.backlogTasks$ = this.store
      .select(selectFilteredTasks({ key: 'status', value: StatusEnum.BACKLOG }))
      .pipe(
        map((tasks) =>
          tasks.filter((task) => task.name.includes(this.filterParam))
        )
      );

    this.inProgressTasks$ = this.store
      .select(
        selectFilteredTasks({ key: 'status', value: StatusEnum.IN_PROGRESS })
      )
      .pipe(
        map((tasks) =>
          tasks.filter((task) => task.name.includes(this.filterParam))
        )
      );

    this.doneTasks$ = this.store
      .select(selectFilteredTasks({ key: 'status', value: StatusEnum.DONE }))
      .pipe(
        map((tasks) =>
          tasks.filter((task) => task.name.includes(this.filterParam))
        )
      );
  }
}
