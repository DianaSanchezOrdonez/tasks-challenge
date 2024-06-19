import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-list',
  standalone: true,
  imports: [RouterLink, MatSidenavModule, MatIconModule, MatListModule],
  templateUrl: './nav-list.component.html',
  styleUrl: './nav-list.component.css',
})
export class NavListComponent {}
