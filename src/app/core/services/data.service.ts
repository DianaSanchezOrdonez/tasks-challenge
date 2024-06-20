import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../../features/dashboard/models/task.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://syn-api-prod.herokuapp.com';

  constructor(private httpClient: HttpClient) {}

  getTasks(params: { key: string; value: string }): Observable<Task[]> {
    const { key, value } = params;

    return this.httpClient.get<Task[]>(`${this.apiUrl}/tasks?${key}=${value}`, {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwb3NpdGlvbklkIjoiQW5ndWxhciBOZXJkZXJ5IiwicHJvamVjdElkIjoiZDIzN2FkZmItNzJmZC00ZmVmLTlkNGUtYTJmMjZjNTFkOTBlIiwiZnVsbE5hbWUiOiJEaWFuYSBTYW5jaGV6IiwiZW1haWwiOiJkaWFuYUByYXZuLmNvIiwiaWF0IjoxNzE4MTM1ODM3fQ.7NCHnyAYsC8wkTKcrHkTr-P3iwa1RfE6FF-Ndawu5b4',
      },
    });
  }
}
