import { type ActionFunctionArgs } from "react-router";
import AuthService from "../services/auth-service";

export async function authenticateAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent") as "check" | "register" | "login";
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const password_confirmation = formData.get("password_confirmation") as string;

  try {
    switch (intent) {
      case "check":
        return await AuthService.userExists(email);
      case "register":
        return await AuthService.registerUser({
          email,
          password,
          password_confirmation,
        });
      case "login":
        return await AuthService.loginUser({ email, password });
    }
  } catch (err) {
    const error = err instanceof Error ? err.message : "Something went wrong";
    return { error, intent };
  }
}
