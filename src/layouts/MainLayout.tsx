import { Layout, Menu, Button, Dropdown, Space, Avatar } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "../hooks/useAuth";
import { usePermission } from "../hooks/usePermission";
import { Permission } from "../types/auth";

const { Header, Content } = Layout;

export default function MainLayout({ children }: any) {
  const { authState, logout } = useAuth();
  const { hasPermission } = usePermission();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const userMenuItems: any = [
    {
      label: `${authState.user?.name} (${authState.user?.role})`,
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      label: "Đăng xuất",
      key: "logout",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 24px",
        }}
      >
        <Menu theme="dark" mode="horizontal" style={{ flex: 1 }}>
          {hasPermission(Permission.VIEW_USERS) && (
            <Menu.Item key="1">
              <Link to="/">Users</Link>
            </Menu.Item>
          )}
          {hasPermission(Permission.VIEW_TASKS) && (
            <Menu.Item key="2">
              <Link to="/tasks">Tasks</Link>
            </Menu.Item>
          )}
          {hasPermission(Permission.VIEW_PROJECTS) && (
            <Menu.Item key="3">
              <Link to="/projects">Projects</Link>
            </Menu.Item>
          )}
        </Menu>

        {authState.isAuthenticated && authState.user && (
          <Space>
            <Dropdown menu={{ items: userMenuItems }}>
              <Button type="text" style={{ color: "#fff" }}>
                <Avatar size="small" style={{ backgroundColor: "#1890ff" }}>
                  {authState.user.name.charAt(0).toUpperCase()}
                </Avatar>
                {authState.user.name}
              </Button>
            </Dropdown>
          </Space>
        )}
      </Header>
      <Content style={{ padding: 20 }}>{children}</Content>
    </Layout>
  );
}
