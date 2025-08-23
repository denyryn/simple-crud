import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type Notification = {
  type: "error" | "success" | "info";
  title: string;
  message: string;
};

type NotificationContextType = {
  notification: Notification | null;
  setNotification: (n: Notification | null) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

const getNotificationStyles = (type: Notification["type"]) => {
  switch (type) {
    case "error":
      return "bg-red-500/30 text-white";
    case "success":
      return "bg-green-500/30 text-white";
    case "info":
    default:
      return "bg-blue-500/30 text-white";
  }
};

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<Notification | null>(null);

  // Auto-dismiss after 5 seconds
  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => {
      setNotification(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [notification]);

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {notification && (
        <div
          className={`fixed top-5 right-5 mb-4 flex max-w-sm items-start justify-between gap-4 rounded p-4 shadow-md ${getNotificationStyles(
            notification.type,
          )}`}
        >
          <div>
            <strong className="mb-1 block">{notification.title}</strong>
            <span>{notification.message}</span>
          </div>
          <button
            className="text-foreground border-0 bg-transparent font-bold"
            onClick={() => setNotification(null)}
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      )}
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }
  return context;
}
