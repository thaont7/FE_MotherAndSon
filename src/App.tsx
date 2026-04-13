import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/MainLayout";
import UserList from "./pages/User/UserList";
import TaskList from "./pages/Task/TaskList";
import ProjectList from "./pages/Project/ProjectList";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/projects" element={<ProjectList />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
