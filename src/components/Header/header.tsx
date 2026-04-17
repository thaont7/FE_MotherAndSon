import { useState } from "react";
import { Layout, Drawer, Button } from "antd";
import {
  MenuOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

export default function MainHeader() {
  const [open, setOpen] = useState(false);

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#fff",
          padding: "0 16px",
          borderBottom: "1px solid #eee",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        {/* Left: Language */}
        <div style={{ fontSize: 14, cursor: "pointer" }}>VI ▾</div>

        {/* Center: Logo */}
        <div style={{ fontSize: 24, fontWeight: 500 }}>PreMom</div>

        {/* Right: Icons */}
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <SearchOutlined style={{ fontSize: 18 }} />
          <ShoppingCartOutlined style={{ fontSize: 18 }} />
          <MenuOutlined
            style={{ fontSize: 20 }}
            onClick={() => setOpen(true)}
          />
        </div>
      </Header>

      {/* Drawer Menu */}
      <Drawer
        placement="right"
        open={open}
        onClose={() => setOpen(false)}
        closable={false}
        width="80%"
        bodyStyle={{ padding: 24 }}
      >
        {/* Close button */}
        <div style={{ textAlign: "right" }}>
          <CloseOutlined
            style={{ fontSize: 20 }}
            onClick={() => setOpen(false)}
          />
        </div>

        {/* Menu content */}
        <div
          style={{
            marginTop: 24,
            display: "flex",
            flexDirection: "column",
            gap: 20,
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          <div>Đồ của bé</div>
          <div>Đồ của mẹ</div>
          <div>Đồ chăm bé</div>
          <div>Phụ kiện</div>
          <div>Hàng đồng giá</div>
          <div>Blog</div>
          <div>Về chúng tớ</div>

          <Button
            type="primary"
            block
            style={{
              marginTop: 16,
              background: "#000",
              borderColor: "#000",
              height: 40,
              fontWeight: 600,
            }}
          >
            Ký gửi đồ
          </Button>

          <div style={{ marginTop: 16 }}>Đăng ký/Đăng nhập</div>
        </div>
      </Drawer>
    </Layout>
  );
}
