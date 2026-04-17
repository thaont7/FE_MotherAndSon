/**
 * Định nghĩa các role và permission cho ứng dụng
 */

export enum UserRole {
  ADMIN = "admin",
  MANAGER = "manager",
  USER = "user",
  GUEST = "guest",
}

export enum Permission {
  // User Management
  VIEW_USERS = "view_users",
  CREATE_USER = "create_user",
  EDIT_USER = "edit_user",
  DELETE_USER = "delete_user",

  // Task Management
  VIEW_TASKS = "view_tasks",
  CREATE_TASK = "create_task",
  EDIT_TASK = "edit_task",
  DELETE_TASK = "delete_task",

  // Project Management
  VIEW_PROJECTS = "view_projects",
  CREATE_PROJECT = "create_project",
  EDIT_PROJECT = "edit_project",
  DELETE_PROJECT = "delete_project",
}

/**
 * Map role với các permission tương ứng
 */
export const rolePermissionMap: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: [
    Permission.VIEW_USERS,
    Permission.CREATE_USER,
    Permission.EDIT_USER,
    Permission.DELETE_USER,
    Permission.VIEW_TASKS,
    Permission.CREATE_TASK,
    Permission.EDIT_TASK,
    Permission.DELETE_TASK,
    Permission.VIEW_PROJECTS,
    Permission.CREATE_PROJECT,
    Permission.EDIT_PROJECT,
    Permission.DELETE_PROJECT,
  ],
  [UserRole.MANAGER]: [
    Permission.VIEW_USERS,
    Permission.VIEW_TASKS,
    Permission.CREATE_TASK,
    Permission.EDIT_TASK,
    Permission.VIEW_PROJECTS,
    Permission.CREATE_PROJECT,
    Permission.EDIT_PROJECT,
  ],
  [UserRole.USER]: [
    Permission.VIEW_TASKS,
    Permission.CREATE_TASK,
    Permission.VIEW_PROJECTS,
  ],
  [UserRole.GUEST]: [],
};

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  } | null;
}
