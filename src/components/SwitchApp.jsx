import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Box, Button } from "@mui/material";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import FastfoodIcon from "@mui/icons-material/Fastfood";

const AppSwitcher = () => {
  const { isGiftShop, setIsGiftShop } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        // backgroundColor: isGiftShop ? "#FFB6C1" : "#8FBC8F",
        backgroundColor: "#fff",
        padding: "6px 12px",
        borderRadius: "12px",
        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {isGiftShop ? (
        <CardGiftcardIcon sx={{ color: "#E75480" }} />
      ) : (
        <FastfoodIcon sx={{ color: "#2E8B57" }} />
      )}
      <Button
        variant="contained"
        sx={{
          backgroundColor: isGiftShop ? "#FF7F9F" : "#8FBC8F",
          color: "#000",
        }}
        onClick={() => setIsGiftShop((prev) => !prev)}
        size="small"
      >
        {isGiftShop ? "Gift Shop" : "Snack Shop"}
      </Button>
    </Box>
  );
};

export default AppSwitcher;
