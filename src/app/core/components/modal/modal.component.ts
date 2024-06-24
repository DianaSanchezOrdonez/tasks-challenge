import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { CustomSelectComponent } from '../custom-select/custom-select.component';
import { SelectOption } from '../custom-select/custom-select.model';
import { DataService } from '../../services/data.service';
import { User } from '../../../features/dashboard/models/user.model';
import { TaskInput } from '../../services/models/task.input';
import { StatusEnum } from '../../../features/dashboard/models/task.enums';

type DropdownKeys = 'estimate' | 'assignee' | 'label' | 'dueDate';

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
    CustomSelectComponent,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  createTaskForm: FormGroup;

  constructor(private dataService: DataService, private fb: FormBuilder) {
    this.createTaskForm = this.fb.group({
      title: ['', Validators.required],
      estimate: ['', Validators.required],
      assignee: ['', Validators.required],
      label: ['', Validators.required],
      dueDate: ['', Validators.required],
    });
  }

  dropdowns: { [key in DropdownKeys]: boolean } = {
    estimate: false,
    assignee: false,
    label: false,
    dueDate: false,
  };

  selectedOptions: { [key in DropdownKeys]?: SelectOption } = {};
  assigneesList: User[] = [];
  assigneesOptions: SelectOption[] = [];
  selectedDueDate: string = '';

  toggleDropdown(select: DropdownKeys) {
    this.dropdowns[select] = !this.dropdowns[select];

    if (select === 'assignee' && this.assigneesList.length) {
      this.assigneesList.forEach((user) =>
        this.assigneesOptions.push({
          label: user.fullName,
          value: user.id,
          avatarUrl: user.avatar,
        })
      );
    }
  }

  selectOption(select: DropdownKeys, option: SelectOption) {
    console.log('select => ', select);
    this.selectedOptions[select] = option;
    this.createTaskForm.get(select)?.setValue(option.value);
    this.dropdowns[select] = false;
  }

  ngOnInit() {
    this.dataService.getUsers().subscribe({
      next: (result) => {
        this.assigneesList = result.data.users;
      },
      error: (error) => {
        console.error('Error fetching users', error);
      },
    });
  }

  createTask(input: TaskInput) {
    this.dataService.createTask(input).subscribe({
      next: (result) => {
        if (result.data) {
          console.log('Task created:', result.data.createTask);
        }
      },
      error: (error) => {
        console.error('There was an error creating the task:', error);
      },
    });
  }

  onDateChanged(fecha: string) {
    this.selectedDueDate = fecha;
    // console.log('this.selectedDueDate', new Date(this.selectedDueDate))
    this.createTaskForm.get('dueDate')?.setValue(this.selectedDueDate);
  }

  validFields(): boolean {
    return this.createTaskForm.valid;
  }

  onSubmit() {
    console.warn(this.createTaskForm.value);
    const { title, estimate, assignee, label, dueDate } =
      this.createTaskForm.value;

    this.createTask({
      name: title,
      pointEstimate: estimate,
      assigneeId: assignee,
      dueDate: new Date(dueDate).toDateString(),
      status: StatusEnum.BACKLOG,
      tags: [label],
    });
  }
}
