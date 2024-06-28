import { createAction, props } from '@ngrx/store';
import { Task } from '../../features/dashboard/models/task.model';
import { FilterTaskInput } from '../services/models/filters.input';
import { TaskInput, TaskUpdateInput } from '../services/models/task.input';

export const addTask = createAction(
  '[Task] Add Task',
  props<{ input: TaskInput }>()
);

export const addTaskSuccess = createAction(
  '[Task] Add Task Success',
  props<{ createTask: Task }>()
);

export const addTaskFailure = createAction(
  '[Task] Add Task Failure',
  props<{ error: any }>()
);

export const deleteTask = createAction(
  'delete Task',
  props<{ taskId: string }>()
);

export const deleteTaskSuccess = createAction(
  '[Task] List Tasks Success',
  props<{ taskId: string }>()
);

export const deleteTaskFailure = createAction(
  '[Task] List Tasks Failure',
  props<{ error: any }>()
);

export const editTask = createAction(
  '[Task] Update Task',
  props<{ input: TaskUpdateInput }>()
);

export const editTaskSuccess = createAction(
  '[Task] Update Task Success',
  props<{ updatedTask: Task }>()
);

export const editTaskFailure = createAction(
  '[Task] Update Task Failure',
  props<{ error: any }>()
);

export const listTasks = createAction(
  'get all tasks',
  props<{ filter?: FilterTaskInput }>()
);

export const listTasksSuccess = createAction(
  '[Task] List Tasks Success',
  props<{ tasks: Task[] }>()
);

export const listTasksFailure = createAction(
  '[Task] List Tasks Failure',
  props<{ error: any }>()
);
