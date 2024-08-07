import { Component, Input, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Task } from '../../services/models/task.model';
import { ChipsComponent } from '../chips/chips.component';
import { AvatarComponent } from '../avatar/avatar.component';
import { LowerCasePipe } from '@angular/common';
import { CustomIconsComponent } from '../custom-icons/custom-icons.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ConvertStringToNumberPipe } from '../../pipes/convert-string-to-number';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { Store } from '@ngrx/store';
import { deleteTask } from '../../store/tasks/task.actions';
import { TaskState } from '../../store/tasks/task.state';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    MatCardModule,
    ChipsComponent,
    AvatarComponent,
    LowerCasePipe,
    CustomIconsComponent,
    MatButtonModule,
    MatMenuModule,
    ConvertStringToNumberPipe,
    MatDialogModule,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  readonly dialog = inject(MatDialog);

  @Input() task!: Task;

  constructor(private store: Store<{ taskState: TaskState }>) {}

  validDueDateStyle(value: string): string {
    const currentDate = new Date().getTime();
    const dueDate = new Date(value).getTime();
    const diffInMs = dueDate - currentDate;

    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (diffInDays <= 2 && diffInDays >= 0) {
      return 'warning-time';
    } else if (diffInDays < 0) {
      return 'danger-time';
    } else {
      return 'on-time';
    }
  }

  openDialog() {
    this.dialog.open(ModalComponent, {
      data: this.task,
    });
  }

  deleteTask(taskId: string) {
    this.store.dispatch(deleteTask({ taskId }));
  }
}
