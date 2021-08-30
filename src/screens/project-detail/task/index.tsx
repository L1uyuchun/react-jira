import { useTask } from "@/screens/project-detail/detail-custom-hooks";

export const Task = () => {
  const { data: taskList } = useTask();
  console.log(taskList);
  return <div>任务</div>;
};
