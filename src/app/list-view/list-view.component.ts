import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
} from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { AvatarComponent } from '../core/components/avatar/avatar.component';
import { ConvertStringToNumberPipe } from '../core/pipes/convert-string-to-number';
import { CustomIconsComponent } from '../core/components/custom-icons/custom-icons.component';
import { Task } from '../core/services/models/task.model';
import { Observable } from 'rxjs';
import { ChipsComponent } from '../core/components/chips/chips.component';

@Component({
  selector: 'app-list-view',
  standalone: true,
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.css',
  imports: [
    CommonModule,
    MatExpansionModule,
    AvatarComponent,
    ConvertStringToNumberPipe,
    CustomIconsComponent,
    ChipsComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListViewComponent {
  panelOpenState = signal(false);

  @Input() backlogTasks$!: Observable<Task[]>;
  @Input() inProgressTasks$!: Observable<Task[]>;
  @Input() doneTasks$!: Observable<Task[]>;

  loading$!: Observable<boolean>;

  constructor() {}
}
