import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips'
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-chips',
  standalone: true,
  imports: [MatChipsModule, MatIconModule],
  templateUrl: './chips.component.html',
  styleUrl: './chips.component.css'
})
export class ChipsComponent {

}
