interface ButtonProps {
  className?: string;
  type: "button" | "submit";
  isActive?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export default function Button({
  onClick,
  type,
  isActive,
  className,
  children,
}: ButtonProps) {
  return (
    <button
      disabled={!isActive || false}
      className={`w-full ${className} ${isActive ? "opacity-100" : "cursor-not-allowed opacity-50"}`}
      onClick={onClick}
      type={type || "button"}
    >
      {children}
    </button>
  );
}
