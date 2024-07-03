import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { AvatarComponent } from '../avatar/avatar.component';
import { CustomIconsComponent } from '../custom-icons/custom-icons.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatInputModule, AvatarComponent, CustomIconsComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  @Input() profileUrl: string | null = null;

  @Output() filter = new EventEmitter<string>();

  constructor() {}

  onInputChange(event: any) {
    this.filter.emit(event.target.value);
  }
}
