import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Task } from '../../../features/dashboard/models/task.model';
import { ChipsComponent } from '../chips/chips.component';
import { AvatarComponent } from '../avatar/avatar.component';
import { LowerCasePipe } from '@angular/common';
import { CustomIconsComponent } from '../custom-icons/custom-icons.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

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
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() task!: Task;
}
