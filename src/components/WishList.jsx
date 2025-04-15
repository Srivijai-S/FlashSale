import styled from "styled-components";
import Hero from "./Hero";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import { useProductsProvider } from "../context/ProductsContext";

const WishList = () => {
  const { wishlisted, removeLike, clearWishlist } = useProductsProvider();
  return (
    <Wrapper>
      {/* <Hero page="WishList"></Hero> */}
      <div className="section-center">
        <h3 className="mb-3">Your wishlist Items</h3>
        <div className="cart">
          <ul className="heading">
            <li>IMAGE</li>
            <li>PRODUCT</li>
            {/* d-none d-lg-block */}
            <li className="">UNIT PRICE</li>
            <li>ACTION</li>
          </ul>

          {wishlisted.length === 0 ? (
            <div className="empty text-center my-5">
              <h3>No item found in your wishList</h3>
              <button className="btn btn-solid py-1">
                <Link to="/products">Add Items</Link>
              </button>
            </div>
          ) : (
            wishlisted.map((item) => {
              console.log(item);
              const { id, price, image, name, category, amount, color } = item;
              return (
                <ul key={id}>
                  <li>
                    <img src={image} alt={name} />
                  </li>
                  <li>
                    <div className="text-center">
                      <h5>{name}</h5>
                      <p className="my-3">
                        <Link
                          className="p-1 rounded-2 btn-solid"
                          to={`/products/${id}`}
                        >
                          View Item
                        </Link>
                      </p>
                    </div>
                  </li>
                  <li className="">{price}</li>

                  <li className="text-center">
                    <ImCross
                      className="remove_btn"
                      onClick={() => {
                        removeLike(id);
                      }}
                    />
                    <br />
                  </li>
                </ul>
              );
            })
          )}
        </div>

        {wishlisted.length !== 0 && (
          <div className="d-flex  my-5 btn-container">
            <button className="btn rounded-5 px-5">
              <Link to="/products">CONTINUE SHOPPING</Link>
            </button>
            <button className="btn rounded-5 px-5" onClick={clearWishlist}>
              CLEAR WISHLIST
            </button>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  h3 {
    color: var(--clr-p-3);
  }
  .heading {
    display: grid;
    border-top: 1px solid var(--clr-p-7);
    background-color: var(--clr-p-9);
    height: 50px;
  }

  ul {
    display: grid;
    list-style: none;
    grid-template-columns: repeat(4, 1fr);
    padding: 0;
    margin: 0;
    border: 1px solid var(--clr-p-7);
    border-top: none;
    align-items: center;
    /* padding: 1rem; */
    height: 200px;
    justify-items: center;
    img {
      width: 100px;
      height: 140px;
    }
    .remove_btn {
      cursor: pointer;
      :hover {
        transition: var(--transition);
        filter: drop-shadow(1px 1px 10px red);
        color: red;
      }
    }
    .color {
      p {
        height: 25px;
        width: 25px;
        border-radius: 50%;
      }
    }
    .btns {
      gap: 1rem;
      border-top: 1px solid var(--clr-p-8);
      border-bottom: 1px solid var(--clr-p-8);
      button {
        border: 1px solid var(--clr-p-8);
        border-top: none;
        border-bottom: none;
        height: 30px;
        svg {
          font-size: 1.3rem;
        }
      }
    }
  }
  @media only screen and (max-width: 992px) {
    ul:not(ul.heading) {
      /* grid-template-columns: repeat(4, 1fr); */
      gap: 0.5rem;
      img {
        width: 70px;
        height: 100px;
      }
    }
  }
  .btn-container {
    /* justify-content-between my-5 btn-container */
    justify-content: space-between;
    button {
      font-weight: 600;
      color: var(--clr-p-4);
      background-color: var(--clr-p-9);
      :hover {
        background-color: var(--clr-p-4);
        color: var(--clr-p-9);
      }
    }
  }
  @media only screen and (max-width: 650px) {
    .btn-container {
      flex-direction: column;
      justify-content: center;
      gap: 1rem;
    }
    .heading {
      font-size: 0.8rem;
    }
  }
`;
export default WishList;
