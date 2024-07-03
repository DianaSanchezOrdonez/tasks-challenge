import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TaskState } from '../../core/store/tasks/task.state';
import { selectFilteredTasks } from '../../core/store/tasks/task.selectors';
import { Observable, map } from 'rxjs';
import { Task } from '../../core/services/models/task.model';
import { listTasks } from '../../core/store/tasks/task.actions';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../core/components/search/search.component';
import { ToolbarComponent } from '../../core/components/toolbar/toolbar.component';
import { StatusEnum } from '../../core/services/models/task.enums';
import { ListViewComponent } from '../../list-view/list-view.component';
import { GridViewComponent } from '../../grid-view/grid-view.component';
import { DataService } from '../../core/services/data.service';
import { User } from '../../core/services/models/user.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [
    CommonModule,
    SearchComponent,
    ToolbarComponent,
    ListViewComponent,
    GridViewComponent,
  ],
})
export class TasksComponent {
  filterParam = '';
  viewSelection: string = 'grid-view';

  backlogTasks$!: Observable<Task[]>;
  inProgressTasks$!: Observable<Task[]>;
  doneTasks$!: Observable<Task[]>;

  user!: User;

  constructor(
    private dataService: DataService,
    private store: Store<{ taskState: TaskState }>
  ) {
    this.dataService.getProfile().subscribe({
      next: (result) => {
        this.user = result.data.profile;
      },
      error: (error) => {
        console.error('Error fetching profile', error);
      },
    });
  }

  ngOnInit() {
    this.store.dispatch(listTasks({ filter: {} }));
    this.setTaskStreams();
  }

  receivedFilter(filter: string) {
    this.filterParam = filter;
    this.setTaskStreams();
  }

  setTaskStreams() {
    this.backlogTasks$ = this.store
      .select(
        selectFilteredTasks({
          key: 'status',
          value: StatusEnum.BACKLOG,
        })
      )
      .pipe(
        map((tasks) =>
          tasks.filter(
            (task) =>
              task.assignee.id === this.user.id &&
              task.name.includes(this.filterParam)
          )
        )
      );

    this.inProgressTasks$ = this.store
      .select(
        selectFilteredTasks({ key: 'status', value: StatusEnum.IN_PROGRESS })
      )
      .pipe(
        map((tasks) =>
          tasks.filter(
            (task) =>
              task.assignee.id === this.user.id &&
              task.name.includes(this.filterParam)
          )
        )
      );

    this.doneTasks$ = this.store
      .select(selectFilteredTasks({ key: 'status', value: StatusEnum.DONE }))
      .pipe(
        map((tasks) =>
          tasks.filter(
            (task) =>
              task.assignee.id === this.user.id &&
              task.name.includes(this.filterParam)
          )
        )
      );
  }

  handleTasksView(buttonId: string) {
    this.viewSelection = buttonId;
  }
}
