import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { UserRole, Permission, rolePermissionMap } from "../types/auth";

interface ProtectedRouteProps {
  element: React.ReactNode;
  requiredRoles?: UserRole[];
  requiredPermissions?: Permission[];
  isPublic?: boolean;
}

/**
 * Component bảo vệ route
 * Kiểm tra quyền truy cập dựa trên role và permission
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  requiredRoles = [],
  requiredPermissions = [],
  isPublic = false,
}) => {
  const { authState } = useAuth();

  // Nếu route là public, cho phép truy cập
  if (isPublic) {
    return element;
  }

  // Nếu chưa authenticated
  if (!authState.isAuthenticated || !authState.user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = authState.user?.role;

  // Kiểm tra role
  if (requiredRoles.length > 0 && userRole && !requiredRoles.includes(userRole)) {
    return <Navigate to="/403" replace />;
  }

  // Kiểm tra permission
  if (requiredPermissions.length > 0 && userRole) {
    const userPermissions = rolePermissionMap[userRole] || [];
    const hasAllPermissions = requiredPermissions.every((perm) =>
      userPermissions.includes(perm)
    );

    if (!hasAllPermissions) {
      return <Navigate to="/403" replace />;
    }
  }

  return element;
};
