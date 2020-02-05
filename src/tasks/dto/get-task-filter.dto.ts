import { TaskStatus } from "../task.model";

export class GetTaskFilter {
  status: TaskStatus
  search: string
}