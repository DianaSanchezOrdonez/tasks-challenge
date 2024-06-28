import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { CustomSelectComponent } from '../custom-select/custom-select.component';
import { SelectOption } from '../custom-select/custom-select.model';
import { DataService } from '../../services/data.service';
import { User } from '../../../features/dashboard/models/user.model';
import { StatusEnum } from '../../../features/dashboard/models/task.enums';
import { Task } from '../../../features/dashboard/models/task.model';
import { ConvertStringToNumberPipe } from '../../pipes/convert-string-to-number';
import { Store } from '@ngrx/store';
import { TaskState } from 'zone.js/lib/zone-impl';
import { addTask, editTask } from '../../store/task.actions';

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
    ConvertStringToNumberPipe,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  createTaskForm: FormGroup;
  task?: Task;
  currentDate: Date = new Date();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Task | undefined,
    private dialogRef: MatDialogRef<ModalComponent>,
    private dataService: DataService,
    private fb: FormBuilder,
    private store: Store<{ taskState: TaskState }>
  ) {
    this.task = data;
    this.createTaskForm = this.fb.group({
      title: [this.data?.name, Validators.required],
      estimate: [this.data?.pointEstimate, Validators.required],
      assignee: [this.data?.assignee.id, Validators.required],
      label: [this.data?.tags, Validators.required],
      dueDate: [this.data?.dueDate, Validators.required],
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
    console.log('edit modal', this.task);

    this.dataService.getUsers().subscribe({
      next: (result) => {
        this.assigneesList = result.data.users;
      },
      error: (error) => {
        console.error('Error fetching users', error);
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
    console.log('coming form', this.createTaskForm.value);
    const { title, estimate, assignee, label, dueDate } =
      this.createTaskForm.value;

    if (this.task) {
      this.store.dispatch(
        editTask({
          input: {
            id: this.task.id,
            name: title,
            pointEstimate: estimate,
            assigneeId: assignee,
            dueDate: new Date(dueDate).toDateString(),
          },
        })
      );

      return this.dialogRef.close();
    }

    this.store.dispatch(
      addTask({
        input: {
          name: title,
          pointEstimate: estimate,
          assigneeId: assignee,
          dueDate: new Date(dueDate).toDateString(),
          status: StatusEnum.BACKLOG,
          tags: [label],
        },
      })
    );

    return this.dialogRef.close();
  }
}
