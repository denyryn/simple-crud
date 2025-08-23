import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router";
import { useAuth } from "@/contexts/auth-context";

export default function AuthLayout() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading) {
      navigate("/", { replace: true });
    }
  }, [user, loading, navigate]);

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <div className="w-full max-w-xs space-y-8 md:max-w-sm">
        <div>
          <h1>Welcome to Slicing Project!</h1>
          <p>Please authenticate to continue.</p>
        </div>
        <Outlet />
      </div>
    </main>
  );
}
