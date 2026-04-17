import { ReactNode } from "react";
import { UserRole, Permission } from "../types/auth";
import UserList from "../pages/User/UserList";
import TaskList from "../pages/Task/TaskList";
import ProjectList from "../pages/Project/ProjectList";

/**
 * Định nghĩa cấu trúc route
 */
export interface RouteConfig {
  path: string;
  element: ReactNode;
  label: string;
  icon?: string;
  requiredRoles?: UserRole[];
  requiredPermissions?: Permission[];
  isPublic?: boolean;
  children?: RouteConfig[];
}

/**
 * Danh sách tất cả các routes của ứng dụng
 * - requiredRoles: Nếu không định nghĩa, route là public
 * - isPublic: Nếu true, bất kỳ ai cũng có thể truy cập
 */
export const routeConfigs: RouteConfig[] = [
  {
    path: "/",
    element: <UserList />,
    label: "Người dùng",
    icon: "UserOutlined",
    requiredRoles: [UserRole.ADMIN, UserRole.MANAGER],
    requiredPermissions: [Permission.VIEW_USERS],
  },
  {
    path: "/tasks",
    element: <TaskList />,
    label: "Nhiệm vụ",
    icon: "CheckCircleOutlined",
    requiredRoles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.USER],
    requiredPermissions: [Permission.VIEW_TASKS],
  },
  {
    path: "/projects",
    element: <ProjectList />,
    label: "Dự án",
    icon: "FolderOutlined",
    requiredRoles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.USER],
    requiredPermissions: [Permission.VIEW_PROJECTS],
  },
];

/**
 * Lấy danh sách routes có thể truy cập từ menu
 * (các routes không bị ẩn)
 */
export const getMenuRoutes = (): RouteConfig[] => {
  return routeConfigs.filter((route) => !route.children || route.children.length > 0);
};
