import { useAuth } from "./useAuth";
import { Permission, rolePermissionMap } from "../types/auth";

/**
 * Hook để kiểm tra quyền hạn của user
 */
export const usePermission = () => {
  const { authState } = useAuth();

  /**
   * Kiểm tra xem user có permission được chỉ định không
   */
  const hasPermission = (permission: Permission): boolean => {
    if (!authState.isAuthenticated || !authState.user) {
      return false;
    }

    const userPermissions = rolePermissionMap[authState.user.role] || [];
    return userPermissions.includes(permission);
  };

  /**
   * Kiểm tra xem user có tất cả các permission được chỉ định không
   */
  const hasAllPermissions = (permissions: Permission[]): boolean => {
    if (!authState.isAuthenticated || !authState.user) {
      return false;
    }

    const userPermissions = rolePermissionMap[authState.user.role] || [];
    return permissions.every((perm) => userPermissions.includes(perm));
  };

  /**
   * Kiểm tra xem user có ít nhất một permission được chỉ định không
   */
  const hasAnyPermission = (permissions: Permission[]): boolean => {
    if (!authState.isAuthenticated || !authState.user) {
      return false;
    }

    const userPermissions = rolePermissionMap[authState.user.role] || [];
    return permissions.some((perm) => userPermissions.includes(perm));
  };

  return {
    hasPermission,
    hasAllPermissions,
    hasAnyPermission,
  };
};
