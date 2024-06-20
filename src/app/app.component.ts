import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavListComponent } from './core/components/nav-list/nav-list.component';
import { CardComponent } from './core/components/card/card.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { SearchComponent } from './core/components/search/search.component';
import { ToolbarComponent } from './core/components/toolbar/toolbar.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './core/services/data.service';

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
    ToolbarComponent,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [DataService]
})
export class AppComponent {
  title = 'tasks-challenge';
}
