let nextToastId = 0;
const listeners = new Set();

function notify(type, message, options = {}) {
  const toast = {
    id: ++nextToastId,
    type,
    message: String(message),
    duration: options.autoClose ?? 3500,
  };
  listeners.forEach((listener) => listener(toast));
  return toast.id;
}

export const toast = {
  success: (message, options) => notify("success", message, options),
  error: (message, options) => notify("error", message, options),
  warning: (message, options) => notify("warning", message, options),
  info: (message, options) => notify("info", message, options),
};

export function subscribeToToasts(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
