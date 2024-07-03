import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { CardComponent } from '../core/components/card/card.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Observable, of } from 'rxjs';
import { Task } from '../core/services/models/task.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-grid-view',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    NgxSkeletonLoaderModule,
    MatCardModule,
  ],
  templateUrl: './grid-view.component.html',
  styleUrl: './grid-view.component.css',
})
export class GridViewComponent {
  @Input() backlogTasks$!: Observable<Task[]>;
  @Input() inProgressTasks$!: Observable<Task[]>;
  @Input() doneTasks$!: Observable<Task[]>;

  loading$: Observable<boolean>;

  constructor() {
    this.loading$ = of(true);
  }

  ngOnInit() {
    setTimeout(() => {
      this.loading$ = of(false);
    }, 500);
  }
}
