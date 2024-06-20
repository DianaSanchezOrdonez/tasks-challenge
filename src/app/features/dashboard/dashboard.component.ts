import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { Task } from './models/task.model';
import { DataService } from '../../core/services/data.service';
import { CardComponent } from '../../core/components/card/card.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { StatusEnum } from './models/task.enums';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  // tasks: Task[] = []
  status: string = 'BACKLOG';
  tasks: Task[] = [
    {
      id: 'c5baa84e-7671-4d93-8842-c594a706d360',
      name: 'Ticket1',
      tags: ['ANDROID', 'REACT'],
      status: StatusEnum.BACKLOG,
      assignee: {
        id: '703de395-1d49-4471-aafa-d990dcf32cd1',
        fullName: 'Grace Stone',
        email: 'gstone@fake.com',
        type: 'CANDIDATE',
        avatar: 'https://avatars.dicebear.com/api/initials/gs.svg',
        createdAt: '2022-12-28T15:33:06.078Z',
        updatedAt: '2022-12-28T15:33:06.079Z',
      },
      creator: {
        id: '703de395-1d49-4471-aafa-d990dcf32cd1',
        fullName: 'Grace Stone',
        email: 'gstone@fake.com',
        type: 'CANDIDATE',
        avatar: 'https://avatars.dicebear.com/api/initials/gs.svg',
        createdAt: '2022-12-28T15:33:06.078Z',
        updatedAt: '2022-12-28T15:33:06.079Z',
      },
      position: 1,
      dueDate: '2024-06-16T19:01:23.566Z',
      pointEstimate: '8',
      createdAt: '2024-06-11T19:57:17.611Z',
    },
  ];

  constructor(private dataService: DataService, private http: HttpClient) {}

  ngOnInit() {
    const params = { key: 'status', value: this.status };

    this.dataService.getTasks(params).subscribe((result) => {
      this.tasks = result;
    });
  }
}
