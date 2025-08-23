interface InputProps {
  name: string;
  type?: string;
  hidden?: boolean;
  placeholder?: string;
  value?: string | number | undefined | null;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: InputProps, ...rest: any[]) {
  return (
    <input
      type={props.type || "text"}
      placeholder={props.placeholder || "Fill the entry"}
      name={props.name}
      value={props.value ?? ""}
      hidden={props.hidden || false}
      disabled={props.disabled || false}
      onChange={props.onChange}
      className="border-foreground/30 bg-background active:border-accent w-full rounded-xl border p-2 px-4"
      {...rest}
    />
  );
}
