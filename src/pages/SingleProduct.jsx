import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProductsProvider } from "../context/ProductsContext";
import { useCartContext } from "../context/CartContext";
import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  Divider,
  Chip,
  Rating,
  Skeleton,
  Stack,
  styled,
  useTheme,
} from "@mui/material";
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  Check as CheckIcon,
  ArrowDropUp as ArrowDropUpIcon,
  ArrowDropDown as ArrowDropDownIcon,
  Share as ShareIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  Pinterest as PinterestIcon,
} from "@mui/icons-material";
import Hero from "../components/Hero";
import { toast } from "react-toastify";
import Tooltip from "@mui/material/Tooltip";
const SingleProduct = () => {
  const [count, setCount] = useState(1);
  const { addItem } = useCartContext();
  const { id } = useParams();
  const {
    fetchSingleProduct,
    single_product_loading,
    single_product_error,
    single_product,
    products,
  } = useProductsProvider();
  const { likeProduct } = useProductsProvider();
  const theme = useTheme();

  const [mainImg, setMainImg] = useState(0);
  const [mainColor, setMainColor] = useState(null);

  const productAdded = () => toast.success("Added To Cart");
  const productLimited = () => toast.error("Max limit reached");

  useEffect(() => {
    fetchSingleProduct(id);
  }, [id]);

  useEffect(() => {
    if (single_product?.colors) {
      setMainColor(single_product.colors[0]);
    }
  }, [single_product]);

  const {
    name,
    images,
    price,
    stars,
    description,
    colors,
    category,
    stock,
    product_price,
    product_image,
    product_name,
    id: itemId,
    discount,
  } = single_product || {};

  const wishlisted = products?.find((item) => item.id === itemId)?.wishlisted;

  const socialIcons = [
    { Icon: FacebookIcon, url: "https://facebook.com" },
    { Icon: TwitterIcon, url: "https://twitter.com" },
    { Icon: InstagramIcon, url: "https://instagram.com" },
    { Icon: PinterestIcon, url: "https://pinterest.com" },
    { Icon: ShareIcon, url: "#" },
  ];

  if (single_product_error) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          p: 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Item not found
        </Typography>
        <Button
          component={Link}
          to="/products"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Back To Collections
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Box sx={{ maxWidth: theme.breakpoints.values.xl, mx: "auto", p: 3 }}>
        {single_product_loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <></>
          </Box>
        ) : (
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 4 }}>
                <Box sx={{ position: "relative", display: "inline-block" }}>
                  {/* Top-right tape (SVG) */}
                  <Box
                    component="svg"
                    viewBox="0 0 100 30"
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: -10,
                      width: 100,
                      height: 30,
                      zIndex: 4,
                      transform: "rotate(10deg)",
                      filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.2))",
                    }}
                  >
                    <defs>
                      <clipPath id="tape-tear">
                        <path d="M0,0 L100,0 L100,30 Q90,25 80,30 Q70,5 60,30 Q50,10 40,30 Q30,5 20,30 Q10,10 0,30 Z" />
                      </clipPath>
                    </defs>
                    <rect
                      width="100"
                      height="30"
                      fill="rgba(65, 65, 65, 0.7)"
                      clipPath="url(#tape-tear)"
                    />
                    <path
                      d="M0,30 Q10,10 20,30 Q30,5 40,30 Q50,10 60,30 Q70,5 80,30 Q90,25 100,30"
                      stroke="rgba(0,0,0,0.1)"
                      strokeWidth="0.5"
                      fill="none"
                    />
                  </Box>

                  {/* Bottom-left tape (SVG) */}
                  <Box
                    component="svg"
                    viewBox="0 0 100 30"
                    sx={{
                      position: "absolute",
                      bottom: 10,
                      left: -10,
                      width: 100,
                      height: 30,
                      zIndex: 3,
                      transform: "rotate(-10deg)",
                      filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.2))",
                    }}
                  >
                    <rect
                      width="100"
                      height="30"
                      fill="rgba(65, 65, 65, 0.7)"
                      clipPath="url(#tape-tear)"
                    />
                    <path
                      d="M0,30 Q10,10 20,30 Q30,5 40,30 Q50,10 60,30 Q70,5 80,30 Q90,25 100,30"
                      stroke="rgba(0,0,0,0.1)"
                      strokeWidth="0.5"
                      fill="none"
                    />
                  </Box>

                  <Box
                    component="img"
                    src={product_image ? product_image[0]?.url : ""}
                    alt={name}
                    sx={{
                      width: "100%",
                      maxHeight: 600,
                      objectFit: "contain",
                      borderRadius: 1,
                      position: "relative",
                      zIndex: 2,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                  />
                </Box>
              </Box>

              <Grid container spacing={1}>
                {images?.map(({ id, url }, index) => (
                  <Grid item xs={2.4} key={id}>
                    <Box
                      component="img"
                      src={url}
                      alt={`Thumbnail ${index + 1}`}
                      onClick={() => setMainImg(index)}
                      sx={{
                        width: "100%",
                        height: 60,
                        objectFit: "contain",
                        cursor: "pointer",
                        opacity: mainImg === index ? 1 : 0.6,
                        transition: "opacity 0.3s ease",
                        border:
                          mainImg === index
                            ? `2px solid ${theme.palette.primary.main}`
                            : "none",
                        borderRadius: 1,
                        "&:hover": {
                          opacity: 1,
                        },
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h3" component="h1" gutterBottom>
                  {product_name}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Rating
                    value={stars || 0}
                    precision={0.5}
                    readOnly
                    sx={{ mr: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    ({stars?.toFixed(1) || "0"})
                  </Typography>
                </Box>

                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
                >
                  <Typography variant="h4" color="primary" fontWeight="bold">
                    ₹{product_price}
                  </Typography>
                  {discount && (
                    <>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ textDecoration: "line-through" }}
                      >
                        ₹{Math.round(price * (1 + discount / 100))}
                      </Typography>
                      <Chip
                        label={`${discount}% OFF`}
                        color="error"
                        size="small"
                      />
                    </>
                  )}
                </Box>

                <Typography variant="body1" paragraph>
                  {description}
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Colors:
                </Typography>
                <Stack direction="row" spacing={1}>
                  {colors?.map((color, index) => (
                    <ColorChip
                      key={index}
                      color={color}
                      selected={mainColor === color}
                      onClick={() => setMainColor(color)}
                    >
                      {mainColor === color && (
                        <CheckIcon sx={{ fontSize: 14 }} />
                      )}
                    </ColorChip>
                  ))}
                </Stack>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 1,
                    }}
                  >
                    <IconButton
                      onClick={() => {
                        if (count >= stock) {
                          productLimited();
                          return;
                        }
                        setCount(count + 1);
                      }}
                      disabled={count >= stock}
                    >
                      <ArrowDropUpIcon />
                    </IconButton>

                    <Typography variant="h6" sx={{ px: 2 }}>
                      {count}
                    </Typography>

                    <IconButton
                      onClick={() => {
                        if (count <= 1) return;
                        setCount(count - 1);
                      }}
                    >
                      <ArrowDropDownIcon />
                    </IconButton>
                  </Box>

                  {stock <= 0 ? (
                    <Button variant="contained" disabled>
                      OUT OF STOCK
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => {
                        addItem(
                          {
                            ...single_product,
                            amount: count,
                            color: mainColor,
                            id: `${id}${mainColor}`,
                            image: images[mainImg].url,
                          },
                          productLimited,
                          productAdded
                        );
                      }}
                      sx={{ flex: 1 }}
                    >
                      ADD TO CART
                    </Button>
                  )}

                  <Tooltip
                    title={
                      wishlisted ? "Remove from wishlist" : "Add to wishlist"
                    }
                  >
                    <IconButton
                      onClick={() => likeProduct(itemId)}
                      sx={{
                        color: wishlisted ? "error.main" : "inherit",
                        "&:hover": {
                          color: "error.main",
                        },
                      }}
                    >
                      {wishlisted ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body1">
                  <strong>Category:</strong> {category}
                </Typography>
                <Typography
                  variant="body1"
                  color={stock > 0 ? "success.main" : "error"}
                >
                  <strong>Availability:</strong>{" "}
                  {stock > 0 ? "In Stock" : "Out of Stock"}
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Stack direction="row" spacing={2}>
                {socialIcons.map(({ Icon, url }, index) => (
                  <IconButton
                    key={index}
                    component="a"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: "text.secondary",
                      "&:hover": {
                        color: "primary.main",
                      },
                    }}
                  >
                    <Icon />
                  </IconButton>
                ))}
              </Stack>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

const ColorChip = styled(Box)(({ theme, color, selected }) => ({
  width: 32,
  height: 32,
  borderRadius: "50%",
  backgroundColor: color,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  border: selected ? `2px solid ${theme.palette.primary.main}` : "none",
  opacity: selected ? 1 : 0.7,
  transition: "all 0.3s ease",
  "&:hover": {
    opacity: 1,
  },
  svg: {
    color: theme.palette.getContrastText(color),
    fontSize: 14,
  },
}));

export default SingleProduct;
