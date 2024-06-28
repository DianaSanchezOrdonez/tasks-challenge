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
      id
      name
      pointEstimate
      dueDate
      tags
      status
      assignee {
        id
        avatar
        fullName
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
      dueDate
    }
  }
`;

const UPDATE_TASK = gql`
  mutation UpdateTask($UpdateTaskInput: UpdateTaskInput!){
    updateTask(input: $UpdateTaskInput) {
      id
      name
      assignee {
        fullName
      }
      creator {
        fullName
      }
      status
      dueDate
    } 
  }
`

const DELETE_TASK = gql`
  mutation DeleteTask($DeleteTaskInput: DeleteTaskInput!){
    deleteTask(input: $DeleteTaskInput) {
      id
      name
    } 
  }
`

export { GET_PROFILE, GET_TASKS_BY_STATUS, GET_USERS, CREATE_TASK, UPDATE_TASK, DELETE_TASK };
