import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
const { Header, Content } = Layout;

export default function MainLayout({ children }: any) {
  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">
            <Link to="/">Users</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/tasks">Tasks</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/projects">Projects</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: 20 }}>{children}</Content>
    </Layout>
  );
}
