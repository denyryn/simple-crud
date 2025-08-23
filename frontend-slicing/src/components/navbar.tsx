import { APP_NAME } from "@/config/constants";
import { useAuth } from "@/contexts/auth-context";
import { useLoaderData } from "react-router";
import { useEffect } from "react";

export default function Navbar() {
  const { user, logout, refreshUser } = useAuth();
  const { user: initialUser } = useLoaderData() as {
    user: { email: string } | null;
  };

  useEffect(() => {
    if (initialUser) {
      refreshUser();
    }
  }, [initialUser]);

  return (
    <nav className="bg-background mb-4 rounded-md border p-4">
      <div className="flex items-center gap-6">
        {/* App Name */}
        <div className="shrink-0 text-lg font-bold">{APP_NAME}</div>

        {/* Vertical separator */}
        <span className="bg-foreground h-6 w-px"></span>

        {/* Navigation Buttons */}
        <div className="flex w-full items-center justify-end">
          <button
            onClick={logout}
            className="text-foreground/70 hover:text-foreground bg-transparent p-1 text-sm"
          >
            {(user ? user.email : "Guest") + " | logout"}
          </button>
        </div>
      </div>
    </nav>
  );
}
