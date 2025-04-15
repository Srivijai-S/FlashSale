import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { About, Products, Home, Error, SingleProduct } from "./pages/index";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeIcon from "@mui/icons-material/Home";
import ArchiveIcon from "@mui/icons-material/Archive";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import Dock from "./components/custom-compoenent/NavEffect";
import InfoIcon from "@mui/icons-material/Info";
import { Box, CssBaseline } from "@mui/material";
import { ThemeContextProvider } from "./context/ThemeContext";
import {
  Login,
  MyAccount,
  Register,
  Navbar,
  Footer,
  Cart,
  WishList,
} from "./components/index";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer position="bottom-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<Error />} />
      </Routes>{" "}
      <NavigationDock />
      <Footer />
    </BrowserRouter>
  );
}
function NavigationDock() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  let lastScrollY = window.scrollY;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // If scrolling down, hide the dock
        setIsVisible(false);
      } else {
        // If scrolling up, show the dock
        setIsVisible(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const items = [
    { icon: <HomeIcon />, label: "Home", onClick: () => navigate("/") },
    {
      icon: <ArchiveIcon />,
      label: "Product",
      onClick: () => navigate("/products"),
    },
    {
      icon: <AccountCircleIcon />,
      label: "Profile",
      onClick: () => navigate("/myaccount"),
    },
    { icon: <InfoIcon />, label: "About", onClick: () => navigate("/about") },
  ];

  return (
    <Box
      sx={{
        display: { xs: "none", lg: "block" },
        position: "fixed",
        bottom: isVisible ? "0" : "-100px", // Moves out of view when hidden
        width: "100%",
        zIndex: 1000,
        transition: "bottom 0.3s ease-in-out", // Smooth hide effect
      }}
    >
      <Dock
        items={items}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
      />
    </Box>
  );
}

export default App;
