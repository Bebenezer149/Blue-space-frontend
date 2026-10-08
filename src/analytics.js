import posthog from "posthog-js";

const projectKey = import.meta.env.VITE_POSTHOG_KEY;
const isPostHogEnabled = Boolean(projectKey);

if (isPostHogEnabled) {
  posthog.init(projectKey, {
    api_host: import.meta.env.VITE_POSTHOG_HOST || "https://us.i.posthog.com",
    defaults: "2025-05-24",
    autocapture: true,
    capture_pageview: "history_change",
    capture_pageleave: true,
    capture_exceptions: true,
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: "[data-ph-mask]",
    },
    before_send: (event) => {
      if (!event?.properties) return event;

      for (const property of [
        "$current_url",
        "$referrer",
        "$initial_current_url",
        "$initial_referrer",
      ]) {
        const value = event.properties[property];
        if (typeof value === "string") {
          const url = new URL(value, window.location.origin);
          url.search = "";
          url.hash = "";
          event.properties[property] = url.toString();
        }
      }

      return event;
    },
  });
}

export function captureEvent(eventName) {
  if (isPostHogEnabled) {
    posthog.capture(eventName);
  }
}
