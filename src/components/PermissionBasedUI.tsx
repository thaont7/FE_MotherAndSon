import React from "react";
import { useAuth } from "../hooks/useAuth";
import { usePermission } from "../hooks/usePermission";
import { Permission } from "../types/auth";
import { Button, Space } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

/**
 * Component ví dụ: Action buttons dựa trên permission
 */
export const ActionButtons: React.FC<{
  onAdd?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}> = ({ onAdd, onEdit, onDelete }) => {
  const { hasPermission } = usePermission();

  return (
    <Space>
      {hasPermission(Permission.CREATE_USER) && (
        <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
          Thêm mới
        </Button>
      )}

      {hasPermission(Permission.EDIT_USER) && (
        <Button icon={<EditOutlined />} onClick={onEdit}>
          Chỉnh sửa
        </Button>
      )}

      {hasPermission(Permission.DELETE_USER) && (
        <Button danger icon={<DeleteOutlined />} onClick={onDelete}>
          Xóa
        </Button>
      )}
    </Space>
  );
};

/**
 * Component ví dụ: Hiển thị thông tin user
 */
export const UserInfo: React.FC = () => {
  const { authState } = useAuth();

  if (!authState.isAuthenticated || !authState.user) {
    return <p>Chưa đăng nhập</p>;
  }

  return (
    <div>
      <h3>Thông tin người dùng</h3>
      <p><strong>Tên:</strong> {authState.user.name}</p>
      <p><strong>Email:</strong> {authState.user.email}</p>
      <p><strong>Role:</strong> {authState.user.role}</p>
    </div>
  );
};

/**
 * Component ví dụ: Menu dựa trên permission
 */
export const PermissionBasedMenu: React.FC = () => {
  const { hasAnyPermission } = usePermission();

  return (
    <nav>
      {hasAnyPermission([Permission.VIEW_USERS]) && (
        <a href="/users">Users</a>
      )}
      {hasAnyPermission([Permission.VIEW_TASKS]) && (
        <a href="/tasks">Tasks</a>
      )}
      {hasAnyPermission([Permission.VIEW_PROJECTS]) && (
        <a href="/projects">Projects</a>
      )}
    </nav>
  );
};
