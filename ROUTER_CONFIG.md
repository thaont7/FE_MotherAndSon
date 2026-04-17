# Router Configuration - Hướng dẫn sử dụng

## Tổng quan

Cấu hình router được thiết kế để hỗ trợ quản lý quyền hạn dễ dàng (Role-Based Access Control - RBAC).

## Cấu trúc thư mục

```
src/
├── router/
│   ├── routes.tsx           # Định nghĩa toàn bộ routes
│   └── ProtectedRoute.tsx   # Component bảo vệ routes
├── hooks/
│   ├── useAuth.ts          # Hook quản lý auth state
│   └── usePermission.ts    # Hook kiểm tra permission
├── types/
│   └── auth.ts             # Types cho auth, role, permission
└── utils/
    └── roleUtils.ts        # Utility functions cho role/permission
```

## Các thành phần chính

### 1. Types (src/types/auth.ts)

Định nghĩa:
- **UserRole**: ADMIN, MANAGER, USER, GUEST
- **Permission**: Các quyền chi tiết (VIEW_USERS, CREATE_USER, etc.)
- **rolePermissionMap**: Map role với danh sách permission tương ứng
- **AuthState**: Cấu trúc auth state

### 2. Route Configuration (src/router/routes.tsx)

```typescript
export interface RouteConfig {
  path: string;
  element: ReactNode;
  label: string;
  icon?: string;
  requiredRoles?: UserRole[];
  requiredPermissions?: Permission[];
  isPublic?: boolean;
}
```

**Cách thêm route mới:**

```typescript
export const routeConfigs: RouteConfig[] = [
  {
    path: "/dashboard",
    element: <Dashboard />,
    label: "Dashboard",
    icon: "DashboardOutlined",
    requiredRoles: [UserRole.ADMIN, UserRole.MANAGER],
    requiredPermissions: [Permission.VIEW_USERS],
  },
  // ... thêm routes khác
];
```

### 3. ProtectedRoute (src/router/ProtectedRoute.tsx)

Component này bảo vệ routes bằng cách:
1. Kiểm tra xem user đã authenticate chưa
2. Kiểm tra role của user
3. Kiểm tra permission của user

Nếu không thỏa điều kiện → redirect đến /403 hoặc /login

### 4. useAuth Hook (src/hooks/useAuth.ts)

```typescript
const { authState, login, logout } = useAuth();

// authState.user?.role
// authState.isAuthenticated
```

### 5. usePermission Hook (src/hooks/usePermission.ts)

```typescript
const { hasPermission, hasAllPermissions, hasAnyPermission } = usePermission();

// Kiểm tra 1 permission
if (hasPermission(Permission.CREATE_USER)) {
  // Hiển thị button tạo user
}

// Kiểm tra tất cả permissions
if (hasAllPermissions([Permission.VIEW_USERS, Permission.EDIT_USER])) {
  // Cho phép hành động
}

// Kiểm tra ít nhất 1 permission
if (hasAnyPermission([Permission.CREATE_TASK, Permission.CREATE_PROJECT])) {
  // Hiển thị menu
}
```

## Cách sử dụng

### 1. Thêm route mới

**Bước 1:** Cập nhật `src/router/routes.tsx`

```typescript
import Dashboard from "../pages/Dashboard";

export const routeConfigs: RouteConfig[] = [
  {
    path: "/dashboard",
    element: <Dashboard />,
    label: "Dashboard",
    requiredRoles: [UserRole.ADMIN],
  },
  // ... routes khác
];
```

**Bước 2:** Component sẽ tự động được bảo vệ bởi ProtectedRoute

### 2. Kiểm tra permission trong component

```typescript
import { usePermission } from "../hooks/usePermission";
import { Permission } from "../types/auth";

export default function UserList() {
  const { hasPermission } = usePermission();

  return (
    <div>
      <h1>Danh sách người dùng</h1>
      
      {hasPermission(Permission.CREATE_USER) && (
        <button>Thêm người dùng</button>
      )}
      
      {hasPermission(Permission.DELETE_USER) && (
        <button>Xóa</button>
      )}
    </div>
  );
}
```

### 3. Cấu hình role và permission

**File:** `src/types/auth.ts`

```typescript
export const rolePermissionMap: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: [
    Permission.VIEW_USERS,
    Permission.CREATE_USER,
    Permission.EDIT_USER,
    Permission.DELETE_USER,
    // ...
  ],
  [UserRole.MANAGER]: [
    Permission.VIEW_USERS,
    Permission.VIEW_TASKS,
    // ...
  ],
  // ...
};
```

## Luồng kiểm tra quyền

```
User truy cập URL
    ↓
ProtectedRoute kiểm tra
    ↓
├─ Chưa authenticate? → Redirect /login
├─ Role không phù hợp? → Redirect /403
├─ Permission không đủ? → Redirect /403
└─ Tất cả OK → Render component
```

## Best Practices

1. **Định nghĩa Permission**: Tạo chi tiết những action nào cần kiểm tra
2. **Role Hierarchy**: Sử dụng `isRoleGreaterOrEqual()` nếu cần so sánh cấp độ role
3. **Conditional Rendering**: Dùng `usePermission` để ẩn/hiện những phần UI không cần thiết
4. **Backend Validation**: Luôn kiểm tra quyền trên server khi thực hiện action
5. **Forbidden Page**: Tạo trang `/403` để hiển thị khi user không có quyền

## Flow của ứng dụng

```
App.tsx
    ↓
AuthProvider (quản lý auth state)
    ↓
Routes mapping từ routeConfigs
    ↓
Mỗi route được bảo vệ bởi ProtectedRoute
    ↓
Component có thể dùng usePermission để kiểm tra quyền hiển thị UI
```

## TODO: Tiếp theo

- [ ] Tạo Login page
- [ ] Tạo 403 (Forbidden) page
- [ ] Tạo Layout sidebar với menu routes được phép
- [ ] Integrate với API authentication
- [ ] Thêm refresh token logic
