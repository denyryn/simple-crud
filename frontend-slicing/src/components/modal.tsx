import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background relative w-full max-w-lg rounded-2xl p-6 shadow-lg">
        {title && (
          <h2 className="text-foreground mb-4 text-xl font-bold">{title}</h2>
        )}
        <button
          onClick={onClose}
          className="text-foreground hover:text-accent absolute top-4 right-4"
        >
          ✕
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
}
