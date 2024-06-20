import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AvatarComponent } from '../avatar/avatar.component';
import { CustomIconsComponent } from '../custom-icons/custom-icons.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    AvatarComponent,
    CustomIconsComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {}
