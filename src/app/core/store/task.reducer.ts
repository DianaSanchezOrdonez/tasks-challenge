import { createReducer, on } from '@ngrx/store';
import {
  addTaskSuccess,
  deleteTaskSuccess,
  editTaskSuccess,
  listTasksSuccess,
} from './task.actions';
import { TaskState } from './task.state';

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

export const taskReducer = createReducer(
  initialState,
  on(addTaskSuccess, (state, { createTask }) => ({
    ...state,
    tasks: [...state.tasks, createTask],
    loading: false,
    error: null,
  })),
  on(deleteTaskSuccess, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.filter((task) => task.id !== taskId),
    loading: false,
    error: null,
  })),
  on(editTaskSuccess, (state, { updatedTask }) => ({
    ...state,
    tasks: state.tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    ),
    loading: false,
    error: null,
  })),
  on(listTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks: tasks,
    loading: false,
    error: null,
  }))
);