interface LinkProps {
  href: string;
  hidden?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

export default function Link({ href, hidden, children, onClick }: LinkProps) {
  return (
    <a
      href={href || "#"}
      className="mt-2 block text-center"
      hidden={hidden || false}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
