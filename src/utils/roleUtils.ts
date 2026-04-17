import { UserRole, Permission, rolePermissionMap } from "../types/auth";

/**
 * Utility functions để kiểm tra role và permission
 */

/**
 * Kiểm tra xem user role có vượt qua được một role cụ thể không
 * Ưu tiên: ADMIN > MANAGER > USER > GUEST
 */
export const isRoleGreaterOrEqual = (
  userRole: UserRole,
  requiredRole: UserRole
): boolean => {
  const roleHierarchy: Record<UserRole, number> = {
    [UserRole.ADMIN]: 4,
    [UserRole.MANAGER]: 3,
    [UserRole.USER]: 2,
    [UserRole.GUEST]: 1,
  };

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
};

/**
 * Tính toán quyền hạn của một role
 */
export const getRolePermissions = (role: UserRole): Permission[] => {
  return rolePermissionMap[role] || [];
};

/**
 * Kiểm tra xem một bộ role có chứa role nào không
 */
export const hasRole = (
  userRole: UserRole,
  allowedRoles: UserRole[]
): boolean => {
  return allowedRoles.includes(userRole);
};
