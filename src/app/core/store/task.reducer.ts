import { createReducer, on } from '@ngrx/store';
import {
  addTaskSuccess,
  deleteTaskSuccess,
  editTaskSuccess,
  listTasks,
  listTasksFailure,
  listTasksSuccess,
  resetLoading,
} from './task.actions';
import { TaskState } from './task.typos';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Task } from '../../features/dashboard/models/task.model';

export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>();

export const initialState: TaskState = adapter.getInitialState({
  loading: false,
  error: null,
});

export const taskReducer = createReducer(
  initialState,
  on(addTaskSuccess, (state, { createTask }) =>
    adapter.addOne(createTask, { ...state, loading: false })
  ),
  on(deleteTaskSuccess, (state, { taskId }) =>
    adapter.removeOne(taskId, { ...state, loading: false })
  ),
  on(editTaskSuccess, (state, { updatedTask }) =>
    adapter.updateOne(
      { id: updatedTask.id, changes: updatedTask },
      { ...state, loading: false }
    )
  ),
  on(listTasks, (state) => ({ ...state, loading: true, error: null })),
  on(listTasksSuccess, (state, { tasks }) =>
    adapter.setAll(tasks, { ...state, loading: false })
  ),
  on(listTasksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
  on(resetLoading, (state) => ({ ...state, loading: false }))
);
