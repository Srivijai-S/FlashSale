import React from "react";
import { useProductsProvider } from "../context/ProductsContext";
import { Link } from "react-router-dom";
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Button,
  Skeleton,
  Tooltip,
  Box,
  styled,
} from "@mui/material";

const GridProducts2 = ({ products }) => {
  const { products_loading, likeProduct } = useProductsProvider();

  if (products_loading) {
    return (
      <Grid container spacing={2}>
        {[...Array(4)].map((_, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card>
              <Skeleton variant="rectangular" height={250} />
              <CardContent>
                <Skeleton width="60%" />
                <Skeleton width="40%" />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      {products?.map((product) => {
        const { name, image, id, price, wishlisted } = product;
        return (
          <Grid item xs={12} sm={6} key={id}>
            <ProductCard>
              <CardMedia
                component="div"
                sx={{
                  position: "relative",
                  height: 250,
                  "&:hover .product-actions": {
                    opacity: 1,
                    transform: "translateY(0)",
                  },
                }}
              >
                <Link
                  to={`/products/${id}`}
                  style={{ display: "block", height: "100%" }}
                >
                  <img
                    src={image}
                    alt={name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Link>
                <CardActions className="product-actions">
                  <Tooltip
                    title={
                      wishlisted ? "Remove from wishlist" : "Add to wishlist"
                    }
                  >
                    <IconButton
                      aria-label="add to favorites"
                      onClick={() => likeProduct(id)}
                      color={wishlisted ? "error" : "default"}
                      sx={{ color: "common.white" }}
                    >
                      {wishlisted ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                  </Tooltip>
                  <Button
                    component={Link}
                    to={`/products/${id}`}
                    variant="contained"
                    size="small"
                    sx={{ flexGrow: 1, mx: 1 }}
                  >
                    Buy Now
                  </Button>
                  <Tooltip title="Quick View">
                    <IconButton
                      aria-label="quick view"
                      sx={{ color: "common.white" }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </CardMedia>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography gutterBottom variant="h6" component="div" noWrap>
                  {name}
                </Typography>
                <Typography variant="h6" color="primary">
                  ₹{price}
                </Typography>
              </CardContent>
            </ProductCard>
          </Grid>
        );
      })}
    </Grid>
  );
};

const ProductCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[4],
  },
  ".product-actions": {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.palette.primary.main,
    opacity: 0,
    transform: "translateY(100%)",
    transition: "all 0.3s ease",
    justifyContent: "center",
    padding: theme.spacing(1),
    ".MuiIconButton-root": {
      color: theme.palette.common.white,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    ".MuiButton-root": {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.dark,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
        opacity: 0.9,
      },
    },
  },
  ".MuiCardMedia-root": {
    overflow: "hidden",
  },
}));

export default GridProducts2;
