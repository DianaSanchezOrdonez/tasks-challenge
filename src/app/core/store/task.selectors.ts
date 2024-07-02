import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FilterInput, TaskState } from './task.typos';
import { adapter } from './task.reducer';
import { Task } from '../../features/dashboard/models/task.model';

export const selectTaskState = createFeatureSelector<TaskState>('taskState');

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();

export const selectAllTasks = createSelector(selectTaskState, selectAll);
export const selectTaskEntities = createSelector(
  selectTaskState,
  selectEntities
);
export const selectTaskIds = createSelector(selectTaskState, selectIds);
export const selectTaskTotal = createSelector(selectTaskState, selectTotal);

export const selectTaskLoading = createSelector(
  selectTaskState,
  (state: TaskState) => state.loading
);

export const selectTaskError = createSelector(
  selectTaskState,
  (state: TaskState) => state.error
);

export const selectFilteredTasks = (filter: FilterInput) =>
  createSelector(selectAllTasks, (tasks: Task[]) =>
    tasks.filter((task) => {
      if (filter.key === 'assigneeId') {
        return task.assignee.id === filter.value;
      } else if (filter.key === 'ownerId') {
        return task.creator.id === filter.value;
      }
      return task[filter.key] === filter.value;
    })
  );
