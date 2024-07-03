import { Component } from '@angular/core';
import { Task } from '../../core/services/models/task.model';
import { StatusEnum } from '../../core/services/models/task.enums';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from '../../core/components/toolbar/toolbar.component';
import { SearchComponent } from '../../core/components/search/search.component';
import { Store } from '@ngrx/store';
import { listTasks } from '../../core/store/tasks/task.actions';
import { TaskState } from '../../core/store/tasks/task.state';
import { selectFilteredTasks } from '../../core/store/tasks/task.selectors';
import { GridViewComponent } from '../../grid-view/grid-view.component';
import { ListViewComponent } from '../../list-view/list-view.component';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarComponent,
    SearchComponent,
    GridViewComponent,
    ListViewComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  filterParam = '';
  viewSelection: string = 'grid-view';

  backlogTasks$!: Observable<Task[]>;
  inProgressTasks$!: Observable<Task[]>;
  doneTasks$!: Observable<Task[]>;

  profileUrl: string | null = null;

  constructor(
    private store: Store<{ taskState: TaskState }>,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.store.dispatch(listTasks({ filter: {} }));
    this.setTaskStreams();
    this.getUserInfo();
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

  handleTasksView(buttonId: string) {
    this.viewSelection = buttonId;
  }

  getUserInfo() {
    this.dataService.getProfile().subscribe({
      next: (result) => {
        this.profileUrl = result.data.profile.avatar;
      },
      error: (error) => {
        console.error('Error fetching profile', error);
      },
    });
  }
}
