import { Routes } from '@angular/router';
import { CardComponent } from './shared/components/card/card.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'tasks',
    component: CardComponent,
  },
];
