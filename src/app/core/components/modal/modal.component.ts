import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { CustomSelectComponent } from '../custom-select/custom-select.component';

type DropdownKeys = 'estimate' | 'assignee';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    CustomSelectComponent
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  dropdowns: { [key in DropdownKeys]: boolean } = {
    estimate: false,
    assignee: false
  };

  selectedOptions: { [key in DropdownKeys]?: any } = {};

  toggleDropdown(select: DropdownKeys) {
    this.dropdowns[select] = !this.dropdowns[select];
  }

  selectOption(select: DropdownKeys, option: any) {
    this.selectedOptions[select] = option;
    console.log(`Selected ${option.label} for ${select}`);
    this.dropdowns[select] = false;
  }

}
