import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavListComponent } from './shared/components/nav-list/nav-list.component';
import { CardComponent } from './shared/components/card/card.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { SearchComponent } from './shared/components/search/search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatSidenavModule,
    MatGridListModule,
    SearchComponent,
    NavListComponent,
    CardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'tasks-challenge';
}
