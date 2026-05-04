import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TodoProvider } from "./components/TodoProvider/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* TodoProvider importa o contexto do Todo criado e envolve toda a aplicação */}
    <TodoProvider>
      <App />
    </TodoProvider>
  </StrictMode>,
);
