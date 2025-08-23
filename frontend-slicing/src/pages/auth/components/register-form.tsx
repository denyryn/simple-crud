import { Form, useNavigation } from "react-router";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

export default function RegisterForm({
  formValues,
  handleChange,
}: {
  formValues: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="post" className="space-y-4">
      <input type="hidden" name="intent" value="register" />
      <Input
        name="email"
        type="email"
        placeholder="Email"
        value={formValues.email ?? ""}
        onChange={handleChange}
        disabled={isSubmitting}
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        value={formValues.password ?? ""}
        onChange={handleChange}
        disabled={isSubmitting}
      />
      <Input
        name="password_confirmation"
        type="password"
        placeholder="Confirm Password"
        value={formValues.password_confirmation ?? ""}
        onChange={handleChange}
        disabled={isSubmitting}
      />
      <Button className="w-full" type="submit" isActive={!isSubmitting}>
        {isSubmitting ? "Loading..." : "Register"}
      </Button>
    </Form>
  );
}
