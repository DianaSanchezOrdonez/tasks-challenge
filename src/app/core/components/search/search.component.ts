import { Component, EventEmitter, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { AvatarComponent } from '../avatar/avatar.component';
import { CustomIconsComponent } from '../custom-icons/custom-icons.component';
import { DataService } from '../../services/data.service';
import { User } from '../../../features/dashboard/models/user.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatInputModule, AvatarComponent, CustomIconsComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  user: User | null = null;

  @Output() filter = new EventEmitter<string>();

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

  onChangeFilter(event: any) {
    this.filter.emit(event.target.value);
  }
}
