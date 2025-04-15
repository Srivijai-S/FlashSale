import React, { useState } from "react";
import { IconButton, TextField, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
const SearchComponent = () => {
  const [showSearch, setShowSearch] = useState(false);
  const theme = useTheme();
  return (
    <Box sx={{ display: { xs: "none", lg: "flex" } }}>
      <IconButton onClick={() => setShowSearch(!showSearch)}>
        <SearchIcon sx={{ color: theme.palette.background.default }} />
      </IconButton>

      {showSearch && (
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search..."
          autoFocus
          sx={{ ml: 1 }}
        />
      )}
    </Box>
  );
};

export default SearchComponent;
