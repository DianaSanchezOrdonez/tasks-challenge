import { gql } from 'apollo-angular';

const GET_PROFILE = gql`
  query GetProfile {
    profile {
      id
      fullName
      avatar
      email
      type
    }
  }
`;

const GET_TASKS_BY_STATUS = gql`
  query GetTasksByStatus($FilterTaskInput: FilterTaskInput!) {
    tasks(input: $FilterTaskInput) {
      name
      pointEstimate
      dueDate
      tags
      assignee {
        avatar
      }
    }
  }
`;

export { GET_PROFILE, GET_TASKS_BY_STATUS };
