import styled from "styled-components";
import { useProductsProvider } from "../context/ProductsContext";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillEye } from "react-icons/ai";
import Cards from "./custom-compoenent/Cards/Card";
import { Box } from "@mui/material";
const ProductsPageGrid = () => {
  const { featured_Products, products_loading, products_error } =
    useProductsProvider();

  if (products_error) {
    return (
      <div>
        <h3 className="text-center my-4">There was an error Loading</h3>
      </div>
    );
  }
  return (
    <Wrapper className="products">
      {products_loading ? (
        <div className="custom-loader"></div>
      ) : (
        featured_Products?.map((product) => {
          console.log(product);
          const { name, image, id, price } = product;

          return (
            <Cards
              key={id}
              imageSrc={image}
              altText={name}
              captionText={name}
              containerHeight="300px"
              containerWidth="300px"
              imageHeight="300px"
              imageWidth="300px"
              rotateAmplitude={12}
              scaleOnHover={1.2}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={true}
              overlayContent={
                <Box
                  sx={{
                    height: "300px",
                    width: "300px",
                    display: "flex",
                    mt: "50px",
                    flexDirection: "column",
                    justifyContent: "center", // Center vertically
                    alignItems: "center", // Center horizontally
                    padding: "16px",
                    gap: 2,
                  }}
                >
                  {/* Middle Content */}
                  <Box
                    sx={{
                      display: "flex",
                      position: "relative",
                      top: "100px",
                      textAlign: "center",
                      backgroundColor: "#fff",
                    }}
                  >
                    <p>{name}</p>
                    {/* Price Section */}
                    <br />
                    <p className="price"> &#x20B9; {price}</p>
                  </Box>

                  {/* Buttons Section */}
                  <Box
                    className="flex gap-2"
                    sx={{ position: "relative", top: "1px" }}
                  >
                    <button
                      className="btn"
                      style={{ backgroundColor: "#ffff" }}
                    >
                      <AiOutlineHeart />
                    </button>
                    <Link
                      to={`/products/${id}`}
                      className="btn"
                      style={{ backgroundColor: "#ffff" }}
                    >
                      Buy Now
                    </Link>
                    <button
                      className="btn"
                      style={{ backgroundColor: "#ffff" }}
                    >
                      <AiFillEye />
                    </button>
                  </Box>
                </Box>
              }
            />
          );
        })
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  gap: 1rem;
  padding: 1rem;
  margin: 1rem;
  grid-template-columns: repeat(3, 1fr);
  min-height: 250px;
  align-items: center;
  text-align: center;

  @media only screen and (min-width: 1350px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media only screen and (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
  .custom-loader {
    place-self: center;
    grid-column: 1/4;
  }

  .image-container {
    position: relative;
    /* aspect-ratio: 1/1; */
    height: 250px;
    overflow: hidden;
    width: 100%;
    margin-bottom: 1rem;
    img {
      width: 100%;
      object-fit: cover;
    }
    > div {
      bottom: -3rem;
      position: absolute;
      z-index: 99;
      width: 100%;
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: stretch;
      transition: var(--transition);
      > * {
        transition: var(--transition);
        background-color: var(--clr-p-3);
        :hover {
          background-color: var(--clr-p-5);
          color: #fff;
        }
      }
      button {
        border: none;
      }
      a {
        flex: 1;
        padding: 10px;
        border-right: 1px solid #fff;
        border-left: 1px solid #fff;
      }
      svg {
        color: #fff;
      }
    }
    .show {
      bottom: 0;
    }
    img {
      height: 250px;
    }
  }
  .custom-loader {
    width: 80px;
    height: 80px;
    display: grid;
    color: var(--clr-p-3);
    -webkit-mask: radial-gradient(circle 5px, #0000 90%, #000);
    animation: sh3 1.5s infinite linear;
  }
  .custom-loader:before,
  .custom-loader:after {
    content: "";
    grid-area: 1/1;
    background: radial-gradient(
          farthest-side at bottom left,
          currentColor 94%,
          #0000
        )
        top left,
      radial-gradient(farthest-side at top right, currentColor 94%, #0000)
        bottom right;
    background-size: 63% 50%;
    background-repeat: no-repeat;
    -webkit-mask: radial-gradient(65% 110% at bottom left, #0000 94%, #000) top
        left,
      radial-gradient(65% 110% at top right, #0000 94%, #000) bottom right;
    -webkit-mask-size: 62% 50%;
    -webkit-mask-repeat: no-repeat;
  }
  .custom-loader:after {
    transform: rotate(90deg);
  }

  @keyframes sh3 {
    100% {
      transform: rotate(1turn);
    }
  }
`;
export default ProductsPageGrid;
