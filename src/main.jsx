import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import AppContext from "./context/Context.jsx";
import "animate.css";
import ProductsContext from "./context/ProductsContext.jsx";
import CartContext from "./context/CartContext.jsx";
import FilterContext from "./context/FilterContext.jsx";
import UserContextProvider from "./context/UserContext.jsx";
import { Box, CssBaseline } from "@mui/material";
import { ThemeContextProvider } from "./context/ThemeContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeContextProvider>
    <CssBaseline />
    <UserContextProvider>
      <ProductsContext>
        <FilterContext>
          <AppContext>
            <CartContext>
              <App />
            </CartContext>
          </AppContext>
        </FilterContext>
      </ProductsContext>
    </UserContextProvider>{" "}
  </ThemeContextProvider>
);
