import { CommonModule, DatePipe, UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { CustomIconsComponent } from '../custom-icons/custom-icons.component';

interface Item {
  hasIcon?: boolean;
  iconName?: string;
  type: 'date' | 'text';
  content: string;
  className: string;
}

@Component({
  selector: 'app-chips',
  standalone: true,
  imports: [CommonModule, MatChipsModule, DatePipe, UpperCasePipe, CustomIconsComponent],
  templateUrl: './chips.component.html',
  styleUrl: './chips.component.css',
})
export class ChipsComponent {
  @Input() item: Item = {
    type: 'date',
    content: 'date',
    className: 'timer-tag'
  };
}
