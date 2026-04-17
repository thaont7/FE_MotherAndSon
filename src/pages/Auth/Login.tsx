import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, Space, Typography, Select, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./Login.css";
import { useAuth } from "../../hooks/useAuth";
import { UserRole } from "../../types/auth";

const { Title, Text } = Typography;

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values: { email: string; password: string; role?: UserRole }) => {
    try {
      setLoading(true);
      // Login với role được chọn từ form
      await login(values.email, values.password, values.role || UserRole.USER);
      message.success("Đăng nhập thành công!");
      // Redirect về trang chủ sau khi login thành công
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      message.error("Đăng nhập thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card" bordered={false}>
        <Space direction="vertical" size="large" style={{ width: "100%" }} align="center">
          <Title level={2}>Đăng Nhập</Title>
          <Text type="secondary">Hệ thống quản lý dự án</Text>

          <Form
            form={form}
            name="login"
            layout="vertical"
            onFinish={onFinish}
            style={{ width: "100%", maxWidth: "400px" }}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="example@gmail.com"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Nhập mật khẩu"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Vai trò (Demo)"
              name="role"
              initialValue={UserRole.USER}
            >
              <Select
                options={[
                  { label: "Admin", value: UserRole.ADMIN },
                  { label: "Manager", value: UserRole.MANAGER },
                  { label: "User", value: UserRole.USER },
                  { label: "Guest", value: UserRole.GUEST },
                ]}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                block
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>

          <Space direction="vertical" size="small" align="center">
            <Text type="secondary">Tài khoản demo:</Text>
            <Text code>Email: demo@example.com</Text>
            <Text code>Password: bất kỳ</Text>
          </Space>
        </Space>
      </Card>
    </div>
  );
}
