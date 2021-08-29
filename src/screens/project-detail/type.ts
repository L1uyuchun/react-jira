export interface Tasks {
  taskName: string;
  taskGroup: string;
  processorId: number;
  labelName: string;
}
export interface ProjectTaskDetail {
  status: string;
  subTasks: { name: string; id: number }[] | null | [];
}
