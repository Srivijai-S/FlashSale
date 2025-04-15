import { Box, Grid, Typography, Select, MenuItem, Button } from "@mui/material";
import Hero from "../components/Hero";
import { BsFillGridFill, BsGrid3X3GapFill, BsListUl } from "react-icons/bs";
import GridProducts from "../components/GridProducts";
import GridProducts2 from "../components/GridProducts2";
import ListProducts from "../components/ListProducts";
import { useFilterContext } from "../context/FilterContext";
import { viewToggleButtons } from "../data";
import Filters from "../components/Filters";
import { useProductsProvider } from "../context/ProductsContext";

const Products = () => {
  const { gridView, gridView_2, listView, changeView } = useFilterContext();
  const { products_error } = useProductsProvider();
  const { changeSort, filtered_product, all_products, sort } =
    useFilterContext();

  return (
    <Box minHeight="100vh">
      {/* <Hero page={"products"} /> */}
      <Grid container spacing={3} padding={3}>
        <Grid item xs={12} md={3}>
          <Filters />
        </Grid>
        <Grid item xs={12} md={9}>
          {products_error ? (
            <Typography variant="h6" textAlign="center" marginTop={4}>
              There was an error loading
            </Typography>
          ) : (
            <>
              {gridView && <GridProducts products={filtered_product} />}
              {gridView_2 && <GridProducts2 products={filtered_product} />}
              {listView && <ListProducts products={filtered_product} />}
            </>
          )}
        </Grid>
      </Grid>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding={3}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Select
            value={sort}
            onChange={(e) => changeSort(e.target.value)}
            displayEmpty
            size="small"
          >
            <MenuItem value="default">None</MenuItem>
            <MenuItem value="ASCENDING">Low to High</MenuItem>
            <MenuItem value="DESCENDING">High to Low</MenuItem>
          </Select>
          <Typography>
            Showing {filtered_product.length} of {all_products.length} results
          </Typography>
        </Box>

        <Box display="flex" gap={1}>
          {viewToggleButtons.map((item) => (
            <Button
              key={item.id}
              onClick={() => changeView(item.view)}
              variant="contained"
              color="primary"
            >
              <item.Icon />
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Products;
