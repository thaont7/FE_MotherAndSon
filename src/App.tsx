import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./layouts/MainLayout";
import Login from "./pages/Auth/Login";
import Forbidden from "./pages/Error/Forbidden";
import { routeConfigs } from "./router/routes";
import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./router/ProtectedRoute";

/**
 * Component wrapper để chỉ render Layout khi không phải ở trang login/403
 */
function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const noLayoutRoutes = ["/login", "/403"];

  if (noLayoutRoutes.includes(location.pathname)) {
    return <>{children}</>;
  }

  return <Layout>{children}</Layout>;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LayoutWrapper>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/403" element={<Forbidden />} />

            {/* Protected Routes */}
            {routeConfigs.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <ProtectedRoute
                    element={route.element}
                    requiredRoles={route.requiredRoles}
                    requiredPermissions={route.requiredPermissions}
                    isPublic={route.isPublic}
                  />
                }
              />
            ))}
          </Routes>
        </LayoutWrapper>
      </AuthProvider>
    </BrowserRouter>
  );
}
