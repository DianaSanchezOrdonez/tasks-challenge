import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { TasksComponent } from './features/tasks/tasks.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'tasks',
    component: TasksComponent,
  },
  { path: '**', component: NotFoundComponent },
];
