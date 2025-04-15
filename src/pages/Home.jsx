import {
  Box,
  Typography,
  Grid,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import image1 from "../assets/cor1.jpg";
import image2 from "../assets/cor2.jpg";
import { homeService } from "../data";
import { useProductsProvider } from "../context/ProductsContext";
import ProductsPageGrid from "../components/ProductsPageGrid";
import "animate.css";
import Airtable from "airtable";
import { slides } from "../../src/assets/Banner";
const airTable = new Airtable({
  apiKey: import.meta.env.VITE_TABLE_KEY,
}).base(import.meta.env.VITE_AIRTABLE_BASE_ID);

const Home = () => {
  const { featured_Products, products_loading, products_error } =
    useProductsProvider();
  const [carouselImages, setCarouselImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      airTable("product")
        .select({ view: "Grid view" })
        .eachPage(
          (records, fetchNextPage) => {
            // Extract images properly from all records
            const images = records
              .map((record) => record.fields.product_image?.[0]?.url) // Safe access
              .filter(Boolean); // Remove undefined values

            setCarouselImages((prevImages) => [...prevImages, ...images]); // Append to state
            fetchNextPage();
          },
          (error) => {
            if (error) {
              console.error("Error fetching Airtable data:", error);
            }
          }
        );
    };

    fetchImages();
  }, []);
  return (
    <Box sx={{ minHeight: "100vh", textAlign: "center" }}>
      {/* Carousel */}
      <Carousel
        showArrows={true}
        showThumbs={false}
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
        swipeable={true}
        emulateTouch={true}
      >
        {slides.map((slide, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              width: "100vw",
              maxHeight: "90vh",
              padding: "20px",
              flexDirection: { xs: "column", md: "row" }, // Stack on small screens
            }}
          >
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                style={{
                  width: "100%",
                  maxWidth: "600px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </Box>

            <Box
              sx={{
                flex: 1,
                paddingLeft: { md: "20px" },
                paddingTop: { xs: "10px", md: "0" },
                textAlign: "left",
              }}
            >
              <Typography variant="h4" fontWeight="bold">
                {slide.text}
              </Typography>
            </Box>
          </Box>
        ))}
      </Carousel>

      {/* Services Section */}
      <Box sx={{ my: 5, px: 3 }}>
        <Grid container spacing={3} justifyContent="center">
          {homeService.map(({ id, Icon, heading, description }) => (
            <Grid item xs={12} sm={6} md={3} key={id}>
              <Card
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                  p: 2,
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <IconButton color="primary">
                  <Icon style={{ fontSize: "3rem" }} />
                </IconButton>
                <CardContent>
                  <Typography variant="h6">{heading}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Featured Products */}
      <Box sx={{ mb: 5 }}>
        <Typography
          variant="h4"
          sx={{ position: "relative", display: "inline-block", mb: 3 }}
        >
          Featured Products
          <Box
            sx={{
              width: "60px",
              height: "3px",
              backgroundColor: "primary.main",
              position: "absolute",
              bottom: "-5px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        </Typography>
        <Typography variant="h6" sx={{ my: 2 }}>
          Best Sellers
        </Typography>
        <ProductsPageGrid />
      </Box>
    </Box>
  );
};

export default Home;
