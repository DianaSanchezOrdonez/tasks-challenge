import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomIconsComponent } from '../custom-icons/custom-icons.component';
import { CommonModule } from '@angular/common';
import { SelectOption } from './custom-select.model';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [CommonModule, CustomIconsComponent, AvatarComponent],
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.css',
})
export class CustomSelectComponent {
  @Input() type:
    | 'icon-select'
    | 'avatar-select'
    | 'checkbox-select'
    | 'datetime-select' = 'icon-select';
  @Input() label!: string | Date;
  @Input() icon!: string;
  @Input() options!: SelectOption[];
  @Input() dropdownOpen: boolean = false;
  @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() select: EventEmitter<SelectOption> =
    new EventEmitter<SelectOption>();
  @Output() selectDate = new EventEmitter<string>();

  selectedOption: SelectOption | null = null;

  toggleDropdown() {
    this.toggle.emit();
  }

  selectOption(option: SelectOption) {
    this.selectedOption = option;
    this.select.emit(option);
  }

  onDateChange(event: any) {
    this.selectDate.emit(event?.target?.value);
  }
}
