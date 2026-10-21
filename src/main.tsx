import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./app/App";
import { Toaster } from "./app/components/ui/sonner";
import "./styles/index.css";

const LoginPage = lazy(() => import("./app/admin/LoginPage").then((m) => ({ default: m.LoginPage })));
const AdminPage = lazy(() => import("./app/admin/AdminPage").then((m) => ({ default: m.AdminPage })));
const RequireAuth = lazy(() =>
  import("./app/admin/RequireAuth").then((m) => ({ default: m.RequireAuth })),
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminPage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<App />} />
        </Routes>
      </Suspense>
      <Toaster theme="light" richColors position="top-right" />
    </BrowserRouter>
  </StrictMode>,
);
