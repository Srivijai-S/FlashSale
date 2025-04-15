import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Box, Popover } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { useGlobalContext } from "../../context/Context";
import { useCartContext } from "../../context/CartContext";
import { useUserContext } from "../../context/UserContext";
import { useProductsProvider } from "../../context/ProductsContext";
import { pages } from "../../data";

const NavBar = () => {
  const { openSidebar } = useGlobalContext();
  const { total_Amount } = useCartContext();
  const { userLogged } = useUserContext();
  const { wishlisted } = useProductsProvider();
  const [anchorEl, setAnchorEl] = useState(null);
  oolean(anchorEl);

  return (
    <>
      <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            display: { xs: "none", lg: "flex" },
            width: "100%",
            gap: "1rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></Box>
      </Box>
    </>
  );
};

export default NavBar;
