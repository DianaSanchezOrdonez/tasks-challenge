import { Component, EventEmitter, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { AvatarComponent } from '../avatar/avatar.component';
import { CustomIconsComponent } from '../custom-icons/custom-icons.component';
import { DataService } from '../../services/data.service';
import { User } from '../../../features/dashboard/models/user.model';
import { Store } from '@ngrx/store';
import { TaskState } from '../../store/task.typos';

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

  constructor(
    private dataService: DataService,
    private store: Store<{ taskState: TaskState }>
  ) {}

  ngOnInit() {
    this.dataService.getProfile().subscribe({
      next: (result) => {
        this.user = result.data.profile;
      },
      error: (error) => {
        console.error('Error fetching profile', error);
      },
    });
  }

  onInputChange(event: any) {
    this.filter.emit(event.target.value);
  }
}
