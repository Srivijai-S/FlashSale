import styled from "styled-components";
import { useProductsProvider } from "../context/ProductsContext";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
const ListProducts = ({ products }) => {
  const { products_loading, likeProduct } = useProductsProvider();
  return (
    <Wrapper className="products">
      {products_loading ? (
        <div className="custom-loader"></div>
      ) : (
        products?.map((product) => {
          const { name, image, id, price, description, wishlisted } = product;
          return (
            <div key={id} className="product">
              <div className="image-container">
                <Link to={`/products/${id}`}>
                  <img src={image} alt={name} />
                </Link>
              </div>
              <div>
                <h5>{name}</h5>
                <p className="price"> &#x20B9; {price}</p>
                <div className="stars">{4.5}</div>
                <p>{description}</p>
                <div className="info">
                  <button className="btn-hover color-8">
                    <Link className="" to={`/products/${id}`}>
                      Buy Now
                    </Link>
                  </button>
                  <button className="" onClick={() => likeProduct(id)}>
                    {wishlisted ? (
                      <AiTwotoneHeart className="liked" />
                    ) : (
                      <AiOutlineHeart />
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(1, 1fr);
  min-height: 250px;
  place-items: center;
  justify-items: stretch;

  .product {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    h5 {
      color: var(--clr-p-1);
      font-size: 1.8rem;
    }
    .price {
      color: red;
      font-size: 1.2rem;
    }
    .stars {
      margin: 1rem 0;
    }
    p {
      line-height: 1.7;
    }
    a:hover {
      color: inherit;
    }

    svg {
      font-size: 1.5rem;
      transition: var(--transition);
      :hover {
        /* color: red; */

        filter: drop-shadow(0 0 10px red);
      }
    }
  }

  .liked {
    color: red;
  }
  @media only screen and (max-width: 650px) {
    .product {
      grid-template-columns: unset;
    }
  }
  .custom-loader {
    place-self: center;
    grid-column: 1/4;
  }

  .image-container {
    position: relative;
    /* min-height: 250px; */
    overflow: hidden;
    width: 100%;
    margin-bottom: 1rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  /* loader */
  .custom-loader {
    --r1: 154%;
    --r2: 68.5%;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: radial-gradient(
        var(--r1) var(--r2) at top,
        #0000 79.5%,
        #766df4 80%
      ),
      radial-gradient(var(--r1) var(--r2) at bottom, #766df4 79.5%, #0000 80%),
      radial-gradient(var(--r1) var(--r2) at top, #0000 79.5%, #766df4 80%),
      #e4e4ed;
    background-size: 50.5% 220%;
    background-position: -100% 0%, 0% 0%, 100% 0%;
    background-repeat: no-repeat;
    animation: p9 2s infinite linear;
  }
  @keyframes p9 {
    33% {
      background-position: 0% 33%, 100% 33%, 200% 33%;
    }
    66% {
      background-position: -100% 66%, 0% 66%, 100% 66%;
    }
    100% {
      background-position: 0% 100%, 100% 100%, 200% 100%;
    }
  }

  /* button animation */
  .btn-hover {
    width: 200px;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    margin: 20px;
    height: 55px;
    text-align: center;
    border: none;
    background-size: 300% 100%;

    border-radius: 10px;
    moz-transition: all 0.4s ease-in-out;
    -o-transition: all 0.4s ease-in-out;
    -webkit-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out;
  }

  .btn-hover:hover {
    background-position: 100% 0;
    moz-transition: all 0.4s ease-in-out;
    -o-transition: all 0.4s ease-in-out;
    -webkit-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out;
  }

  .btn-hover:focus {
    outline: none;
  }

  .btn-hover.color-8 {
    background-image: linear-gradient(
      to right,
      var(--clr-p-2),
      #485563,
      #2b5876,
      #4e4376
    );
    box-shadow: 0 4px 15px 0 rgba(45, 54, 65, 0.75);
  }
`;
export default ListProducts;
