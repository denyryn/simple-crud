import { redirect } from "react-router";
import AuthService from "@/services/auth-service";

export const authLoader = async () => {
  try {
    const response = await AuthService.checkAuth();
    const user = response.data?.user;

    console.log(user);

    if (user) {
      // User is authenticated → redirect to home
      return redirect("/");
    }

    // User not authenticated → allow route to render
    return null;
  } catch (error) {
    console.error("Auth check failed:", error);
    // On error, allow route to render (or redirect to login if you prefer)
    return null;
  }
};
