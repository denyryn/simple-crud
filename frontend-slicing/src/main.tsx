import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import route from "./route.tsx";
import { RouterProvider } from "react-router";
import { NotificationProvider } from "./contexts/notification.tsx";
import { AuthProvider } from "./contexts/auth-context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NotificationProvider>
      <AuthProvider>
        <RouterProvider router={route} />
      </AuthProvider>
    </NotificationProvider>
  </StrictMode>,
);
