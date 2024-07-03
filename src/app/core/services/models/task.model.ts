import { PointEstimateEnum, StatusEnum, TagsEnum } from "./task.enums";
import { User } from "./user.model";

interface Task {
  id: string;
	name: string;
	tags: TagsEnum[];
	status: StatusEnum;
	assignee: User;
	creator: User;
	position: number;
	dueDate: string;
	pointEstimate: PointEstimateEnum;
	createdAt: string;
}

export { Task }