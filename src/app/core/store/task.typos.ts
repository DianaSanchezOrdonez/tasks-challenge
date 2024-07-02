import { EntityState } from '@ngrx/entity';
import { Task } from '../../features/dashboard/models/task.model';
import { FilterTaskInput } from '../services/models/filters.input';

type ValueOf<T> = T[keyof T];

export interface TaskState extends EntityState<Task> {
  loading: boolean;
  error: any;
}

export interface FilterInput {
  key: keyof FilterTaskInput;
  value: ValueOf<FilterTaskInput>;
}
