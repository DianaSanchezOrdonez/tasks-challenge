import { Injectable } from '@angular/core';
import { Task } from '../../features/dashboard/models/task.model';
import { Observable } from 'rxjs';
import { User } from '../../features/dashboard/models/user.model';
import { Apollo } from 'apollo-angular';
import { GET_PROFILE, GET_TASKS_BY_STATUS } from './graphql.operations';
import { ApolloQueryResult } from '@apollo/client';
import { FilterTaskInput } from './models/filters.input';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private headers = {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwb3NpdGlvbklkIjoiQW5ndWxhciBOZXJkZXJ5IiwicHJvamVjdElkIjoiZDIzN2FkZmItNzJmZC00ZmVmLTlkNGUtYTJmMjZjNTFkOTBlIiwiZnVsbE5hbWUiOiJEaWFuYSBTYW5jaGV6IiwiZW1haWwiOiJkaWFuYUByYXZuLmNvIiwiaWF0IjoxNzE4MTM1ODM3fQ.7NCHnyAYsC8wkTKcrHkTr-P3iwa1RfE6FF-Ndawu5b4',
  };

  constructor(private apolloClient: Apollo) {}

  getProfile(): Observable<ApolloQueryResult<{ profile: User }>> {
    return this.apolloClient.watchQuery<{ profile: User }>({
      query: GET_PROFILE,
      context: {
        headers: this.headers,
      },
    }).valueChanges;
  }

  getTasks(
    input?: FilterTaskInput
  ): Observable<ApolloQueryResult<{ tasks: Task[] }>> {
    return this.apolloClient.watchQuery<{ tasks: Task[] }>({
      query: GET_TASKS_BY_STATUS,
      variables: {
        FilterTaskInput: input,
      },
      context: {
        headers: this.headers,
      },
    }).valueChanges;
  }
}
