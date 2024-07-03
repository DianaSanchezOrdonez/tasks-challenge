import { EntityState } from '@ngrx/entity';
import { Task } from '../../services/models/task.model';
import { FilterTaskInput } from '../../services/models/inputs/filters.input';

type ValueOf<T> = T[keyof T];

export interface TaskState extends EntityState<Task> {
  loading: boolean;
  error: any;
}

export interface FilterInput {
  key: keyof FilterTaskInput;
  value: ValueOf<FilterTaskInput>;
}
