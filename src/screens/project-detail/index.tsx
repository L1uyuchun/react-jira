import { Link, Navigate, Route, Routes } from "react-router-dom";
import { Task } from "@/screens/project-detail/task";
import { BackBoard } from "@/screens/project-detail/backBoard";

export const ProjectDetail = () => {
  console.log(window.location.pathname, window.location.pathname + "/board");
  return (
    <div>
      <nav>
        <Link to="board">看板</Link>
        <Link to="task">任务组</Link>
      </nav>
      <Routes>
        <Route path={"task"} element={<Task />}></Route>
        <Route path={"board"} element={<BackBoard />}></Route>
        <Navigate to={"board"}></Navigate>
      </Routes>
    </div>
  );
};
