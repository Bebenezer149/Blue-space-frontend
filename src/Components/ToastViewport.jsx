import { useEffect, useState } from "react";
import { subscribeToToasts } from "../toast";

const icons = {
  success: <path d="m5 12 4.2 4L19 6.8" />,
  error: <><path d="m8 8 8 8M16 8l-8 8" /></>,
  warning: <><path d="M12 8v4M12 16h.01" /><path d="M10.3 3.7 2.9 17a2 2 0 0 0 1.7 3h14.8a2 2 0 0 0 1.7-3L13.7 3.7a2 2 0 0 0-3.4 0Z" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>,
};

function ToastItem({ notification, dismiss }) {
  useEffect(() => {
    const timer = window.setTimeout(() => dismiss(notification.id), notification.duration);
    return () => window.clearTimeout(timer);
  }, [dismiss, notification.duration, notification.id]);

  return (
    <div className={`custom-toast custom-toast--${notification.type}`} role={notification.type === "error" ? "alert" : "status"}>
      <span className="custom-toast__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {icons[notification.type]}
        </svg>
      </span>
      <p className="custom-toast__message">{notification.message}</p>
      <button type="button" className="custom-toast__close" onClick={() => dismiss(notification.id)} aria-label="Dismiss notification">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m7 7 10 10M17 7 7 17" /></svg>
      </button>
      <span className="custom-toast__progress" style={{ animationDuration: `${notification.duration}ms` }} />
    </div>
  );
}

function ToastViewport() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => subscribeToToasts((notification) => {
    setNotifications((current) => [...current, notification].slice(-4));
  }), []);

  const dismiss = (id) => setNotifications((current) => current.filter((notification) => notification.id !== id));

  return (
    <div className="custom-toast-viewport" aria-live="polite" aria-relevant="additions">
      {notifications.map((notification) => (
        <ToastItem key={notification.id} notification={notification} dismiss={dismiss} />
      ))}
    </div>
  );
}

export default ToastViewport;
