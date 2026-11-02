import { useEffect } from "react";

const SITE_URL = "https://www.bluespace.live";
const DEFAULT_IMAGE = `${SITE_URL}/social-preview.jpg`;

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function SEO({
  title,
  description,
  noIndex = false,
  image = DEFAULT_IMAGE,
  structuredData,
}) {
  useEffect(() => {
    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "robots", noIndex ? "noindex, nofollow" : "index, follow");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:url", `${SITE_URL}${window.location.pathname}`);
    setMeta("property", "og:image", new URL(image, SITE_URL).href);
    setMeta("name", "twitter:card", "summary");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", new URL(image, SITE_URL).href);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!noIndex) {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = `${SITE_URL}${window.location.pathname}`;
    } else {
      canonical?.remove();
    }

    let structuredDataElement = document.getElementById("bluespace-structured-data");
    if (structuredData) {
      if (!structuredDataElement) {
        structuredDataElement = document.createElement("script");
        structuredDataElement.id = "bluespace-structured-data";
        structuredDataElement.type = "application/ld+json";
        document.head.appendChild(structuredDataElement);
      }
      structuredDataElement.textContent = JSON.stringify(structuredData);
    } else {
      structuredDataElement?.remove();
    }
  }, [description, image, noIndex, structuredData, title]);

  return null;
}

export { SITE_URL };
export default SEO;
