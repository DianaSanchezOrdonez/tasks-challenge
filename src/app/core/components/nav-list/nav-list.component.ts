import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomIconsComponent } from '../custom-icons/custom-icons.component';

@Component({
  selector: 'app-nav-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatSidenavModule,
    MatListModule,
    CustomIconsComponent,
  ],
  templateUrl: './nav-list.component.html',
  styleUrl: './nav-list.component.css',
})
export class NavListComponent {
  constructor(private router: Router) {}

  isRouteActive(route: string): boolean {
    return this.router.url === route;
  }
}
