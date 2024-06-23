import { Component, Input } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { RegistryIconsService } from '../../services/registry-icons.service';

@Component({
  selector: 'app-custom-icons',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './custom-icons.component.html',
  styleUrl: './custom-icons.component.css',
  providers: [RegistryIconsService, MatIconRegistry],
})
export class CustomIconsComponent {
  @Input() icon: string = '';
  @Input() svgIcon?: string;

  constructor(private registryIconsService: RegistryIconsService) {}

  ngOnInit() {
    this.registryIconsService.registerIcon(
      'attachement',
      '/assets/images/attachement.svg'
    );
    this.registryIconsService.registerIcon(
      'thread',
      '/assets/images/thread.svg'
    );
    this.registryIconsService.registerIcon(
      'comment',
      '/assets/images/comment.svg'
    );
    this.registryIconsService.registerIcon(
      'estimate',
      '/assets/images/estimate.svg'
    );
    this.registryIconsService.registerIcon(
      'assignee',
      '/assets/images/assignee.svg'
    );
    this.registryIconsService.registerIcon(
      'label',
      '/assets/images/label.svg'
    );
    this.registryIconsService.registerIcon(
      'duedate',
      '/assets/images/duedate.svg'
    );
  }
}
