import { useEffect, useState } from "react";
import { useActionData } from "react-router";
import { authenticateAction } from "@/actions/auth-actions";
import { useNotification } from "@/contexts/notification";
import EmailForm from "./components/email-form";
import LoginForm from "./components/login-form";
import RegisterForm from "./components/register-form";
import Link from "@/components/ui/link";
import { type ApiResponse } from "@/types/api-response-type";
import type { User } from "@/types/user-type";

export const authAction = authenticateAction;
type FormType = "email" | "login" | "register";

export default function AuthPage() {
  const { setNotification } = useNotification();
  const [formType, setFormType] = useState<FormType>("email");

  const [formValues, setFormValues] = useState<Record<string, string>>(() => {
    if (typeof window === "undefined") return {};
    const saved = localStorage.getItem("formValues");
    return saved ? JSON.parse(saved) : {};
  });

  const data = useActionData() as ApiResponse<{ user?: User; intent?: string }>;

  // Persist only email safely
  useEffect(() => {
    if (formValues.email) {
      localStorage.setItem(
        "formValues",
        JSON.stringify({ email: formValues.email }),
      );
    }
  }, [formValues.email]);

  // Show errors
  useEffect(() => {
    if (data?.status === "error") {
      setNotification({
        type: "error",
        title: "Error Occurred",
        message: data.message || "Unknown error",
      });
    }

    if (data?.status === "success") {
      setNotification({
        type: "success",
        title: "Success",
        message: data.message || "Operation completed successfully",
      });
    }
  }, [data, setNotification]);

  // Switch form based on check intent
  useEffect(() => {
    if (!data) return;

    if (data.data?.intent === "check") {
      setFormType(data.status === "success" ? "login" : "register");
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      {formType === "email" && (
        <EmailForm formValues={formValues} handleChange={handleChange} />
      )}

      {formType === "register" && (
        <>
          <RegisterForm formValues={formValues} handleChange={handleChange} />
          <Link href="#" onClick={() => setFormType("login")}>
            Have an account? Login
          </Link>
        </>
      )}

      {formType === "login" && (
        <>
          <LoginForm formValues={formValues} handleChange={handleChange} />
          <Link href="#" onClick={() => setFormType("register")}>
            Don't have an account? Register
          </Link>
        </>
      )}
    </div>
  );
}
