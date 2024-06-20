import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { Task } from '../../../features/dashboard/models/task.model';
import { ChipsComponent } from '../chips/chips.component';
import { AvatarComponent } from '../avatar/avatar.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    ChipsComponent,
    AvatarComponent
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  providers: [MatIconRegistry]
})
export class CardComponent {
  @Input() task!: Task;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.matIconRegistry.addSvgIcon(
      'attachement',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/images/attachement.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'thread',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/images/thread.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'comment',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/images/comment.svg'
      )
    );
  }
}
