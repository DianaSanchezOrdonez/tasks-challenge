import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, filter, map } from 'rxjs/operators';
import { DataService } from '../services/data.service';
import {
  addTask,
  addTaskFailure,
  addTaskSuccess,
  deleteTask,
  deleteTaskFailure,
  deleteTaskSuccess,
  editTask,
  editTaskFailure,
  editTaskSuccess,
  listTasks,
  listTasksFailure,
  listTasksSuccess,
  resetLoading,
} from './task.actions';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private dataService: DataService) {}

  listTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(listTasks),
      exhaustMap((action) => {
        return this.dataService.getTasks(action.filter).pipe(
          map((response) => {
            return listTasksSuccess({ tasks: response.data.tasks });
          }),
          catchError((error) => {
            return of(listTasksFailure({ error }));
          })
        );
      })
    )
  );

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTask),
      exhaustMap((action) =>
        this.dataService.createTask(action.input).pipe(
          map((response) =>
            addTaskSuccess({ createTask: response.data!.createTask })
          ),
          catchError((error) => of(addTaskFailure({ error })))
        )
      )
    )
  );

  editTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editTask),
      exhaustMap((action) =>
        this.dataService.updateTask(action.input).pipe(
          map((response) =>
            editTaskSuccess({ updatedTask: response.data!.updateTask })
          ),
          catchError((error) => of(editTaskFailure({ error })))
        )
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTask),
      exhaustMap((action) =>
        this.dataService.deleteTask(action.taskId).pipe(
          map((response) =>
            deleteTaskSuccess({ taskId: response.data!.deleteTask.id })
          ),
          catchError((error) => of(deleteTaskFailure({ error })))
        )
      )
    )
  );

  resetLoading$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      map(() => resetLoading())
    )
  );
}
