import { TagsEnum, StatusEnum, PointEstimateEnum } from "../../../features/dashboard/models/task.enums";

interface TaskInput {
  name: string;
  tags: TagsEnum[];
  status: StatusEnum;
  pointEstimate: PointEstimateEnum;
  dueDate: string;
  assigneeId: string;
}

interface TaskUpdateInput extends Partial<TaskInput> {
  id: string;
}

export { TaskInput, TaskUpdateInput }
