import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n/config";

const rootElement = document.getElementById("root")!;

// Check if the app was server-rendered
if (rootElement.hasChildNodes()) {
  // Hydrate the server-rendered content
  hydrateRoot(rootElement, <App />);
} else {
  // Client-side render
  createRoot(rootElement).render(<App />);
}
