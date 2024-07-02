import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardComponent } from '../core/components/card/card.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Observable } from 'rxjs';
import { Task } from '../features/dashboard/models/task.model';
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
  @Input() loading$!: Observable<boolean>;
  @Input() backlogTasks$!: Observable<Task[]>;
  @Input() inProgressTasks$!: Observable<Task[]>;
  @Input() doneTasks$!: Observable<Task[]>;
}
