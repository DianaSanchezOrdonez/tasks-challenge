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

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
      type
      fullName
      avatar
    }
  }
`;

const CREATE_TASK = gql`
  mutation CreateTask($CreateTaskInput: CreateTaskInput!) {
    createTask(input: $CreateTaskInput) {
      id
      name
      assignee {
        fullName
      }
      creator {
        fullName
      }
      status
    }
  }
`;

export { GET_PROFILE, GET_TASKS_BY_STATUS, GET_USERS, CREATE_TASK };
