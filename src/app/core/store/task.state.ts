import { Task } from '../../features/dashboard/models/task.model';

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: any;
}
