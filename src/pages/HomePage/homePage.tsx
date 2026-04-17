import { Button } from "antd";
import { useEffect, useState, useRef } from "react";

export function HomePage() {
  // ================= HERO =================
  const heroData = [
    {
      title: "Đồ xinh cho bé",
      subtitle: "Giá nhẹ cho mẹ",
      desc: "Đã kiểm định – Sạch sẽ – Tiết kiệm đến 70%",
      bg: "#f5f5f5",
    },
    {
      title: "Thanh lý đồ bé",
      subtitle: "Chất lượng như mới",
      desc: "Giá tốt – Lựa chọn thông minh",
      bg: "#e8f5e9",
    },
    {
      title: "Mua sắm tiết kiệm",
      subtitle: "Cho mẹ và bé",
      desc: "Hàng ngàn sản phẩm đang chờ bạn",
      bg: "#e3f2fd",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroData.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // ================= CATEGORY =================
  const categories = [
    "Quần áo sơ sinh",
    "Đồ bầu cho mẹ",
    "Xe đẩy / nôi",
    "Phụ kiện",
    "Đồ chơi",
    "Bình sữa",
    "Sữa & thực phẩm",
    "Tã bỉm",
    "Ghế ăn dặm",
    "Đồ ngủ bé",
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const scrollAmount = 120;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {/* ================= HERO ================= */}
      <div
        style={{
          height: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 16px",
          background: heroData[current].bg,
          transition: "0.3s",
        }}
      >
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700 }}>
            {heroData[current].title}
            <br />
            {heroData[current].subtitle}
          </h2>

          <p style={{ marginTop: 8, fontSize: 14 }}>{heroData[current].desc}</p>

          <Button
            type="primary"
            style={{
              marginTop: 16,
              background: "#000",
              borderColor: "#000",
              borderRadius: 24,
              padding: "0 24px",
              height: 40,
            }}
          >
            Xem hàng ngay
          </Button>

          {/* DOTS */}
          <div
            style={{
              marginTop: 16,
              display: "flex",
              gap: 8,
              justifyContent: "center",
            }}
          >
            {heroData.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrent(index)}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: current === index ? "#000" : "#ccc",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ================= CATEGORY ================= */}
      <div style={{ padding: 16, position: "relative" }}>
        {/* LEFT ARROW */}
        <div
          onClick={() => scroll("left")}
          style={{
            position: "absolute",
            left: 0,
            top: "40%",
            zIndex: 2,
            cursor: "pointer",
            padding: 8,
          }}
        >
          ◀
        </div>

        {/* RIGHT ARROW */}
        <div
          onClick={() => scroll("right")}
          style={{
            position: "absolute",
            right: 0,
            top: "40%",
            zIndex: 2,
            cursor: "pointer",
            padding: 8,
          }}
        >
          ▶
        </div>

        <div
          ref={scrollRef}
          style={{
            display: "flex",
            gap: 12,
            overflowX: "auto",
            scrollBehavior: "smooth",
            padding: "0 24px",
          }}
        >
          {categories.map((item) => (
            <div
              key={item}
              style={{
                minWidth: 80,
                textAlign: "center",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "#ddd",
                  margin: "0 auto",
                }}
              />
              <div style={{ marginTop: 8, fontSize: 12 }}>{item}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= PRODUCT BLOCK ================= */}
      <div style={{ padding: "16px" }}>
        <div
          style={{
            height: 120,
            background: "#ddd",
            borderRadius: 8,
            marginBottom: 16,
          }}
        />

        <div style={{ display: "flex", gap: 12 }}>
          <div
            style={{
              flex: 1,
              height: 120,
              background: "#ddd",
              borderRadius: 8,
            }}
          />
          <div
            style={{
              flex: 1,
              height: 120,
              background: "#ddd",
              borderRadius: 8,
            }}
          />
        </div>
      </div>

      {/* ================= FLOATING ================= */}
      <div
        style={{
          position: "fixed",
          right: 16,
          bottom: 100,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          zIndex: 1000,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "#0084ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
          }}
        >
          M
        </div>

        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "#0068ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 12,
          }}
        >
          Zalo
        </div>
      </div>
    </div>
  );
}
