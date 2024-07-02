import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CustomIconsComponent } from '../custom-icons/custom-icons.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    CustomIconsComponent,
    MatButtonModule,
    MatDialogModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {
  @Output() viewSelection = new EventEmitter<string>();

  activeButton: string = 'grid-view';
  dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(ModalComponent);
  }

  setActiveButton(buttonId: string) {
    this.activeButton = buttonId;
    this.viewSelection.emit(buttonId);
  }
}
