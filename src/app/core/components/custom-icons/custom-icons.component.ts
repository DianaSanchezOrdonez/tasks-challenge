import { Component, Input } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-custom-icons',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './custom-icons.component.html',
  styleUrl: './custom-icons.component.css',
  providers: [MatIconRegistry],
})
export class CustomIconsComponent {
  @Input() icon: string = '';
  @Input() svgIcon?: string;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
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
