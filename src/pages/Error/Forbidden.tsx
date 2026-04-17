import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Forbidden() {
  const navigate = useNavigate();
  const { authState } = useAuth();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <Result
        status="403"
        title="403"
        subTitle={`Bạn không có quyền truy cập trang này${
          authState.isAuthenticated && authState.user
            ? ` (Role: ${authState.user.role})`
            : ""
        }`}
        extra={
          authState.isAuthenticated && authState.user ? (
            [
              <Button type="primary" key="home" onClick={handleGoHome}>
                Về trang chủ
              </Button>,
              <Button key="back" onClick={handleGoBack}>
                Quay lại
              </Button>,
            ]
          ) : (
            <Button type="primary" key="login" onClick={handleLogin}>
              Đăng nhập
            </Button>
          )
        }
      />
    </div>
  );
}
