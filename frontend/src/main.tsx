import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./servers/context/AuthContext.tsx";
import { Toaster } from "./view/components/ui/toaster.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App/>
      <Toaster/>
    </AuthProvider>
  </React.StrictMode>
);
