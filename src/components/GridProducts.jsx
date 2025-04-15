import React, { useState } from "react";
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
  Modal,
  Box,
  Skeleton,
  Rating,
  Chip,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const ProductGrid = ({ products }) => {
  const { products_loading, likeProduct } = useProductsProvider();
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpenQuickView = (product) => {
    setQuickViewProduct(product);
    setOpen(true);
  };

  const handleCloseQuickView = () => {
    setOpen(false);
  };

  if (products_loading) {
    return (
      <Grid container spacing={3}>
        {[...Array(6)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
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
    <>
      <Grid container spacing={3}>
        {products?.map((product) => {
          const { name, image, id, price, wishlisted, rating, discount } =
            product;
          return (
            <Grid item xs={12} sm={6} md={4} key={id}>
              <StyledCard>
                <CardMedia
                  component="div"
                  sx={{
                    position: "relative",
                    height: 250,
                    "&:hover .product-actions": {
                      opacity: 1,
                      bottom: 0,
                    },
                  }}
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
                  {discount && (
                    <Chip
                      label={`${discount}% OFF`}
                      color="error"
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        fontWeight: "bold",
                      }}
                    />
                  )}
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
                        onClick={() => handleOpenQuickView(product)}
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
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Rating
                      name="read-only"
                      value={rating || 0}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                    <Typography variant="caption">
                      ({rating ? rating.toFixed(1) : "0"})
                    </Typography>
                  </Box>
                  <Typography variant="h6" color="primary">
                    ₹{price}
                  </Typography>
                  {discount && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textDecoration: "line-through" }}
                    >
                      ₹{Math.round(price * (1 + discount / 100))}
                    </Typography>
                  )}
                </CardContent>
              </StyledCard>
            </Grid>
          );
        })}
      </Grid>

      {/* Quick View Modal */}
      <Modal
        open={open}
        onClose={handleCloseQuickView}
        aria-labelledby="quick-view-modal"
        aria-describedby="quick-view-product-details"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: 900,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          {quickViewProduct && (
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <CardMedia
                  component="img"
                  image={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  sx={{
                    width: "100%",
                    height: "auto",
                    maxHeight: 400,
                    objectFit: "contain",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom>
                  {quickViewProduct.name}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Rating
                    value={quickViewProduct.rating || 0}
                    precision={0.5}
                    readOnly
                  />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    (
                    {quickViewProduct.rating
                      ? quickViewProduct.rating.toFixed(1)
                      : "0"}
                    )
                  </Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h5"
                    color="primary"
                    sx={{ fontWeight: "bold" }}
                  >
                    ₹{quickViewProduct.price}
                  </Typography>
                  {quickViewProduct.discount && (
                    <>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                          textDecoration: "line-through",
                          display: "inline",
                          mr: 1,
                        }}
                      >
                        ₹
                        {Math.round(
                          quickViewProduct.price *
                            (1 + quickViewProduct.discount / 100)
                        )}
                      </Typography>
                      <Chip
                        label={`${quickViewProduct.discount}% OFF`}
                        color="error"
                        size="small"
                      />
                    </>
                  )}
                </Box>
                <Typography variant="body1" paragraph>
                  {quickViewProduct.description ||
                    "Product description will be added soon."}
                </Typography>
                <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/products/${quickViewProduct.id}`}
                    size="large"
                  >
                    View Full Details
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      likeProduct(quickViewProduct.id);
                      handleCloseQuickView();
                    }}
                    size="large"
                    startIcon={
                      quickViewProduct.wishlisted ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderIcon />
                      )
                    }
                  >
                    {quickViewProduct.wishlisted ? "Saved" : "Save"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          )}
        </Box>
      </Modal>
    </>
  );
};

const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[6],
  },
  ".product-actions": {
    position: "absolute",
    bottom: -50,
    left: 0,
    right: 0,
    backgroundColor: theme.palette.primary.main,
    opacity: 0,
    transition: "all 0.3s ease",
    justifyContent: "center",
    padding: theme.spacing(1),
    ".MuiIconButton-root": {
      color: theme.palette.common.white,
    },
  },
}));

export default ProductGrid;
