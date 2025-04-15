import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  Box,
  SvgIcon,
} from "@mui/material";
import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../context/Context";
import logo from "../assets/Sidebar.svg";

const Sidebar = () => {
  const { state, closeSidebar } = useGlobalContext();
  const isSideBarOpen = state.isSideBarOpen;

  return (
    <Drawer anchor="left" open={isSideBarOpen} onClose={closeSidebar}>
      <Box sx={{ width: 250, p: 2 }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <img src={logo} alt="Sidebar Logo" width={40} height={40} />
          <IconButton onClick={closeSidebar}>
            <FaTimes />
          </IconButton>
        </Box>

        <List>
          {[
            { text: "Home", to: "/" },
            { text: "About", to: "/about" },
            { text: "Products", to: "/products" },
            { text: "Cart", to: "/cart" },
            { text: "Profile", to: "/myaccount" },
          ].map((item) => (
            <NavLink
              to={item.to}
              key={item.text}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </NavLink>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
