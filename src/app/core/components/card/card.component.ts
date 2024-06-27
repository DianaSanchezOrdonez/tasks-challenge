import { Component, Input, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Task } from '../../../features/dashboard/models/task.model';
import { ChipsComponent } from '../chips/chips.component';
import { AvatarComponent } from '../avatar/avatar.component';
import { LowerCasePipe } from '@angular/common';
import { CustomIconsComponent } from '../custom-icons/custom-icons.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ConvertStringToNumberPipe } from '../../pipes/convert-string-to-number';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { DataService } from '../../services/data.service';

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

  constructor(private dataService: DataService) {}

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
    this.dataService.deleteTask(taskId).subscribe({
      next: (result) => {
        if (result.data) {
          console.log('Task deleted:', result.data.deleteTask);
        }
      },
      error: (error) => {
        console.error('There was an error deleting the task:', error);
      },
    });
  }
}
