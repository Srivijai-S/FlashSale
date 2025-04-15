import {
  Box,
  TextField,
  Select,
  MenuItem,
  Slider,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { ImCheckmark, ImSearch } from "react-icons/im";
import getUniqueValues from "../utils/getUniqueValues";
import { useFilterContext } from "../context/FilterContext";

const Filters = () => {
  const {
    filters: {
      max_price,
      min_price,
      price,
      text,
      brands: brand,
      colors: currColor,
      categories: all_Category,
    },
    all_products,
    updateFilter,
    clearFilter,
  } = useFilterContext();

  const categories = getUniqueValues(all_products, "category");
  const colors = getUniqueValues(all_products, "colors");
  const brands = getUniqueValues(all_products, "company");

  return (
    <Box position="sticky" top={80} padding={2}>
      {/* Search Bar */}
      <Box display="flex" gap={1} mb={2}>
        <TextField
          fullWidth
          name="text"
          onChange={updateFilter}
          variant="outlined"
          size="small"
          value={text}
          placeholder="Search..."
        />
        <Button variant="contained" color="primary">
          <ImSearch />
        </Button>
      </Box>

      {/* Categories */}
      <Box mb={2}>
        <Typography variant="h6">Category</Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={all_Category["all"]}
              onChange={updateFilter}
              name="categories"
              value="all"
            />
          }
          label="All"
        />
        {categories.map((category, ind) => (
          <FormControlLabel
            key={ind}
            control={
              <Checkbox
                checked={all_Category[category]}
                onChange={updateFilter}
                name="categories"
                value={category}
              />
            }
            label={category}
          />
        ))}
      </Box>

      {/* Brands */}
      <Box mb={2}>
        <Typography variant="h6">Brand</Typography>
        <Select
          fullWidth
          size="small"
          value={brand}
          name="brands"
          onChange={updateFilter}
        >
          <MenuItem value="all">All</MenuItem>
          {brands.map((brand, ind) => (
            <MenuItem key={ind} value={brand}>
              {brand}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Price Range */}
      <Box mb={2}>
        <Typography variant="h6">Price</Typography>
        <Typography>{price}</Typography>
        <input
          style={{ width: "100%" }}
          type="range"
          name="price"
          id=""
          value={price}
          min={min_price}
          max={max_price}
          onChange={updateFilter}
        />
      </Box>

      {/* Clear Filters */}
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={clearFilter}
      >
        Clear Filters
      </Button>
    </Box>
  );
};

export default Filters;
