import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Box,
  Popover,
  InputBase,
  Typography,
} from "@mui/material";
import RotatingText from "./custom-compoenent/StyledHeader";
import {
  Search as SearchIcon,
  FavoriteBorder,
  ShoppingBag,
  ExpandMore,
  MenuRounded,
} from "@mui/icons-material";
import { useContext } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTheme } from "@mui/material/styles";
import SearchBox from "./common-component/Seachbox";
import Sidebar from "./Sidebar";
import { useGlobalContext } from "../context/Context";
import { useCartContext } from "../context/CartContext";
import { useUserContext } from "../context/UserContext";
import { useProductsProvider } from "../context/ProductsContext";
import { pages } from "../data";
import NavBar from "./custom-compoenent/NavBar";
import { ThemeContext } from "../context/ThemeContext";
import AppSwitcher from "./SwitchApp";
const Navbar = () => {
  const { isGiftShop, setIsGiftShop } = useContext(ThemeContext);
  const { total_Amount } = useCartContext();
  const { openSidebar } = useGlobalContext();
  const { userLogged } = useUserContext();
  const { wishlisted } = useProductsProvider();
  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopoverOpen = (event) => setAnchorEl(event.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const [key, setKey] = useState(0);

  const handleAnimationComplete = () => {
    setTimeout(() => {
      setKey((prevKey) => prevKey + 1);
    }, 1000); // Delay before restarting
  };
  return (
    <AppBar position="static" sx={{ backgroundColor: "#fff", color: "#000" }}>
      <Toolbar>
        <Box sx={{ display: { xs: "flex", lg: "none" } }}>
          <IconButton onClick={openSidebar}>
            <MenuRounded />
          </IconButton>{" "}
          <Sidebar />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center", // Ensure overall centering
          }}
        >
          <Box sx={{ display: { xs: "none", lg: "flex" } }}>
            <img
              src="/faviico.svg"
              alt="Favicon"
              style={{ width: "50px", height: "50px" }}
            />{" "}
            <Typography
              sx={{
                fontSize: { xs: "1.4rem", lg: "2rem" },
                fontWeight: 700,
                fontFamily: "Bangers, system-ui",
                textAlign: "center",
                color: "#0f120c",
                display: { xs: "none", lg: "inline-block" },
              }}
            >
              Flash
              <span
                style={{ color: "#FF9800", fontFamily: "Bangers, system-ui" }}
              >
                Sale
              </span>
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <SearchBox />
          <IconButton component={Link} to="/wishlist">
            <Badge badgeContent={wishlisted.length} color="error">
              <FavoriteBorder
                sx={{ color: isGiftShop ? "#FF7F9F" : "#8FBC8F" }}
              />
            </Badge>
          </IconButton>
          <Box>
            <LanguageSwitcher />
          </Box>
          <IconButton component={Link} to="/cart">
            <Badge badgeContent={total_Amount} color="error">
              <ShoppingBag sx={{ color: isGiftShop ? "#FF7F9F" : "#8FBC8F" }} />
            </Badge>
          </IconButton>
          <AppSwitcher />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
