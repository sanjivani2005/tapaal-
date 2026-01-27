import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./styles/index.css";
import "./styles/tailwind.css";

console.log('Main.tsx loaded');

const rootElement = document.getElementById("root");
if (!rootElement) {
    console.error('Root element not found');
} else {
    console.log('Root element found, mounting React app');
    createRoot(rootElement).render(<App />);
}