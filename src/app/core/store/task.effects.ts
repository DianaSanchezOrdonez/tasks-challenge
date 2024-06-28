import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
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
} from './task.actions';

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private dataService: DataService) {}

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(listTasks),
      exhaustMap((action) => {
        console.log('effect action', action);
        return this.dataService.getTasks(action.filter).pipe(
          map((response) => {
            // console.log('response.data.tasks', response.data.tasks);
            return listTasksSuccess({ tasks: response.data.tasks });
          }),
          catchError((error) => of(listTasksFailure({ error })))
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
          map((response) =>{
            console.log('response', response)
            console.log('response.data!.deleteTask.id', response.data!.deleteTask.id)
            return deleteTaskSuccess({ taskId: response.data!.deleteTask.id })
          }),
          catchError((error) => of(deleteTaskFailure({ error })))
        )
      )
    )
  );
}
