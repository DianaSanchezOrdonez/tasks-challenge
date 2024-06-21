import { Routes } from '@angular/router';
import { CardComponent } from './core/components/card/card.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { NotFoundComponent } from './features/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'tasks',
    component: CardComponent,
  },
  { path: '**', component: NotFoundComponent },
];
