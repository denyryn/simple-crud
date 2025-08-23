import Navbar from "@/components/navbar";
import { Outlet, useNavigate } from "react-router";
import { useAuth } from "@/contexts/auth-context";
import { useEffect } from "react";

export default function AppLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen w-svw">
      <div className="flex flex-1 flex-col p-2">
        <Navbar />
        <main className="bg-background w-full flex-1 rounded-md border p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
