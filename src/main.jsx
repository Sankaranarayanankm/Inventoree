import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ProductContext from "./context/productContext.jsx";
import ModalContext from "./context/modalContext.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthContext from "./context/authContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthContext>
    <BrowserRouter>
      <ModalContext>
        <ProductContext>
          <App />
        </ProductContext>
      </ModalContext>
    </BrowserRouter>
  </AuthContext>
);
