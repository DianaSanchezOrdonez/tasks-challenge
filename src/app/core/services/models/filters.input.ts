import {
  StatusEnum,
  TagsEnum,
} from '../../../features/dashboard/models/task.enums';

interface FilterTaskInput {
  assigneeId?: string;
  dueDate?: string;
  name?: string;
  ownerId?: string;
  pointEstimate?: string;
  status?: StatusEnum;
  tags?: TagsEnum[];
}

export { FilterTaskInput }