import { redirect } from "react-router";
import AuthService from "@/services/auth-service";

export const requireAuthLoader = async () => {
  try {
    const response = await AuthService.checkAuth();
    const user = response.data?.user;

    if (!user) {
      // Not logged in → redirect to auth page
      return redirect("/auth");
    }

    // Logged in → return user data (optional)
    return { user };
  } catch (error) {
    console.error("Auth check failed:", error);
    return redirect("/auth");
  }
};
