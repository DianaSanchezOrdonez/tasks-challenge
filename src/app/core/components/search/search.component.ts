import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AvatarComponent } from '../avatar/avatar.component';
import { CustomIconsComponent } from '../custom-icons/custom-icons.component';
import { DataService } from '../../services/data.service';
import { User } from '../../../features/dashboard/models/user.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    AvatarComponent,
    CustomIconsComponent,
    AsyncPipe,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  user: User | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getProfile().subscribe({
      next: (result) => {
        this.user = result.data.profile;
        console.log('this.user inside subscription', this.user);
      },
      error: (error) => {
        console.error('Error fetching profile', error);
      },
    });
  }
}
