import React, { useState } from "react";
import { IconButton, Popover, Box, Typography } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import CheckIcon from "@mui/icons-material/Check";
import i18n from "../config/localization/localize";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
// import { useDispatch } from "react-redux";
// import { setLanguage } from "../../core/store/redux/slices/Language-slice";

export const languages = [
  { code: "en", label: "English", flag: "https://flagcdn.com/w320/us.png" },
  { code: "hi", label: "हिंदी", flag: "https://flagcdn.com/w320/in.png" },
  { code: "ar", label: "العربية", flag: "https://flagcdn.com/w320/sa.png" },
  { code: "th", label: "ไทย", flag: "https://flagcdn.com/w320/th.png" },
];

export default function LanguageSwitcher() {
  const { isGiftShop, setIsGiftShop } = useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("language") || "en"
  );
  // const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = async (langCode) => {
    try {
      await i18n.changeLanguage(langCode);
      localStorage.setItem("language", langCode);
      setSelectedLanguage(langCode);
      // dispatch(setLanguage(langCode));
      handleClose();
    } catch (error) {
      console.error("Error in changeLanguage:", error);
    }
  };

  return (
    <>
      <IconButton
        size="small"
        onClick={handleClick}
        sx={{ color: "inherit" }}
        aria-label="Select Language"
      >
        <LanguageIcon
          sx={{
            fontSize: { xs: "6.154vw", sm: "3.46vw", md: "1.667vw" },
            color: isGiftShop ? "#FF7F9F" : "#8FBC8F",
          }}
        />
      </IconButton>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box
          sx={{
            fontFamily: "Inter",
            fontSize: "0.833vw",
            fontWeight: "500px",
            color: "rgba(76, 76, 76, 1)",
            textAlign: "left",
            textUnderlinePosition: "from-font",
            textDecorationSkipInk: "none",
            width: {
              xs: "28.328vw",
              sm: "120px",
              md: "7.431vw",
              lg: "9vw",
            },
            // minWidth: "150px",
            backgroundColor: "white",
            borderRadius: "8px",
            border: "1px solid rgba(255, 225, 155, 1)",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          {languages.map((lang) => (
            <Box
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "8px 10px",
                fontFamily: "Inter",
                fontSize: "0.833vw",
                fontWeight: 500,
                cursor: "pointer",
                borderRadius: "4px",
                color:
                  selectedLanguage === lang.code
                    ? "rgba(222, 168, 41, 1)"
                    : "rgba(76, 76, 76, 1)",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                },
              }}
            >
              {lang.code !== "en" && (
                <Box
                  component="img"
                  src={lang.flag}
                  alt={lang.label}
                  sx={{
                    width: { xs: "18px", sm: "20px", md: "24px" },
                    height: "16px",
                    fontWeight: 500,
                    borderRadius: "2px",
                    objectFit: "cover",
                    marginRight: "10px",
                  }}
                />
              )}
              <Typography
                sx={{
                  flexGrow: 1,
                  fontFamily: "Inter",
                  fontSize: { xs: "0.7rem", sm: "0.9rem", md: "0.833vw" },
                  fontWeight: "500px",
                  // color: "rgba(76, 76, 76, 1)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {lang.code === "en" && (
                  <LanguageIcon
                    sx={{
                      fontSize: "25px",
                      fontWeight: "500px",
                      transform: "scale(0.8)",
                      color:
                        selectedLanguage === lang.code
                          ? "rgba(222, 168, 41, 1)"
                          : "rgba(76, 76, 76, 1)",
                    }}
                  />
                )}
                {lang.label}
              </Typography>
              {selectedLanguage === lang.code && (
                <CheckIcon
                  sx={{
                    marginLeft: "2px",
                    color: "rgba(222, 168, 41, 1)",
                    fontSize: "1rem",
                    fontWeight: "500px",
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      </Popover>
    </>
  );
}
