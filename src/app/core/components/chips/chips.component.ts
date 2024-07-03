import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
  imports: [CommonModule, CustomIconsComponent],
  templateUrl: './chips.component.html',
  styleUrl: './chips.component.css',
})
export class ChipsComponent {
  @Input() item: Item = {
    type: 'date',
    content: 'date',
    className: 'on-time',
  };
}
