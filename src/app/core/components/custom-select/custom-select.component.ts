import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomIconsComponent } from '../custom-icons/custom-icons.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [CommonModule, CustomIconsComponent],
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.css'
})
export class CustomSelectComponent {
  @Input() label!: string;
  @Input() icon!: string;
  @Input() options!: any[];
  @Input() dropdownOpen: boolean = false;
  @Output() toggle: EventEmitter<void> = new EventEmitter<void>();
  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  selectedOption: any;

  toggleDropdown() {
    this.toggle.emit();
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.select.emit(option);
  }
}
