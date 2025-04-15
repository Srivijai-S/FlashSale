import styled from "styled-components";
import Hero from "./Hero";
import { ImCross } from "react-icons/im";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";

import { useCartContext } from "../context/CartContext";

const Cart = () => {
  const {
    cart,
    removeItem,
    ToggleCount,
    clearCart,
    total_Amount,
    total_Price,
  } = useCartContext();
  const productAdded = () => {
    toast.success("Added To Cart");
  };
  const productLimited = () => {
    toast.error("max_Limit reached");
  };
  // console.log(cart);
  // useEffect(() => {
  //   postData(cart);
  // }, [cart]);
  return (
    <Wrapper>
      {/* <Hero page={"cart"}></Hero> */}
      <div className="section-center">
        <h3>Your Cart Items</h3>
        <div className="cart">
          <ul className="heading">
            <li>IMAGE</li>
            <li>PRODUCT</li>
            <li className="d-none d-lg-block">UNIT PRICE</li>
            <li>QTY</li>
            <li className="d-none d-lg-block">SUBTOTAL</li>
            <li>ACTION</li>
          </ul>

          {cart.length === 0 ? (
            <div className="empty text-center my-5">
              <h3>your cart is empty</h3>
              <button className="btn btn-solid py-1">
                <Link to="/products">Fill it</Link>
              </button>
            </div>
          ) : (
            cart.map((item) => {
              // console.log(item);
              const { id, price, image, name, category, amount, color } = item;
              // postData(item);
              return (
                <ul key={id}>
                  <li>
                    <img src={image} alt={name} />
                  </li>
                  <li>
                    <div>
                      <h5>{name}</h5>
                      <div className="color d-flex align-items-center my-2">
                        Color:
                        <div
                          className="ms-3"
                          style={{
                            background: color,
                          }}
                        ></div>
                      </div>
                      <p className="d-none d-lg-block">category: {category}</p>
                      <p className="price d-lg-none">
                        &#x20B9; {price * amount}
                      </p>
                    </div>
                  </li>
                  <li className="d-none d-lg-block">{price}</li>
                  <li>
                    <div>
                      <div className="btns d-flex align-items-center">
                        <button>
                          <IoMdArrowDropup
                            onClick={() => {
                              ToggleCount(
                                { id, act: "INC" },
                                productLimited,
                                productAdded
                              );
                            }}
                          />
                        </button>
                        <p>{amount}</p>
                        <button>
                          <IoMdArrowDropdown
                            onClick={() => {
                              ToggleCount(
                                { id, act: "DEC" },
                                productLimited,
                                productAdded
                              );
                            }}
                          />
                        </button>
                      </div>
                    </div>
                  </li>
                  <li className="d-none d-lg-block">{price * amount}</li>
                  <li>
                    <ImCross
                      className="remove_btn"
                      onClick={() => removeItem(id)}
                    />
                  </li>
                </ul>
              );
            })
          )}
        </div>

        {cart.length !== 0 && (
          <div className="d-flex  my-5 btn-container flex-wrap  gap-4 justify-content-center justify-content-lg-between">
            <button className="btn rounded-5 px-5">
              <Link to="/products">CONTINUE SHOPPING</Link>
            </button>
            <button className="btn rounded-5 px-5 bg-primary text-light">
              <a href="#checkout">Checkout</a>
            </button>
            <button className="btn rounded-5 px-5" onClick={() => clearCart()}>
              CLEAR SHOPPING CART
            </button>
          </div>
        )}

        <div className="checkout d-grid my-5">
          <Card>
            <Card.Header>
              <Card.Title className="m-0">Estimate Shipping And Tax</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text className="mb-4">
                Enter your destination to get a shipping estimate.
              </Card.Text>
              <div>
                <span>* country</span>
                <Form.Select aria-label="Default select example">
                  <option value="india">India</option>
                  <option value="pakistan">Pakistan</option>
                  <option value="china">china</option>
                </Form.Select>
              </div>
              <div className="my-4">
                <span>* Region/state</span>
                <Form.Select aria-label="Default select example">
                  <option value="TamilNadu">TamilNadu</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Delhi">Delhi</option>
                </Form.Select>
              </div>
              <div className="mb-4">
                <span>* Zip/postal code</span>
                <Form.Control
                  className=""
                  type="text"
                  placeholder="eg: 600001"
                />
              </div>
              <Button className="btn-solid" variant="primary rounded-5 px-4">
                Get A Quote
              </Button>
            </Card.Body>
          </Card>

          {/*  */}
          <Card>
            <Card.Header>
              <Card.Title className="m-0">use coupon code</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text>Enter your coupon code if you have one.</Card.Text>
              <Form.Control className="my-4" />
              <Button className="btn-solid" variant="primary rounded-5  px-4">
                Apply Coupon
              </Button>
            </Card.Body>
          </Card>
          {/*  */}
          <Card id="checkout">
            <Card.Header>
              <Card.Title className="m-0">cart Total</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <span className="d-flex justify-content-between mt-2">
                  <span>Total Products : </span>
                  <span className="total text-light bg-primary px-2 rounded-5">
                    {total_Amount}
                  </span>
                </span>
                <span className="d-flex justify-content-between my-4">
                  <span>Grand Total : </span>
                  <span className="total text-success fw-semibold">
                    {total_Price}
                  </span>
                </span>
              </Card.Text>
              <Link to="/checkout">
                <Button
                  className="btn-solid"
                  variant="primary rounded-5 px-4 mb-4"
                >
                  Proceed to Checkout
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  #checkout {
    background-color: #cfe2ff;
  }
  min-height: 100vh;
  h3 {
    color: var(--clr-p-3);
  }
  .cart {
    margin-top: 1.5rem;
  }
  .checkout {
    gap: 2rem;
    color: var(--clr-p-4);
    align-items: start;
    button {
      color: var(--clr-p-9);
      :hover {
        color: var(--clr-p-3);
      }
    }
    > * {
      background-color: var(--clr-p-10);
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
  }
  @media only screen and (min-width: 650px) {
    .checkout {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media only screen and (min-width: 992px) {
    .checkout {
      grid-template-columns: repeat(3, 1fr);
    }
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
    grid-template-columns: repeat(6, 1fr);
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
      div {
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
    ul {
      grid-template-columns: repeat(4, 1fr);
      gap: 0.5rem;
      img {
        width: 70px;
        height: 100px;
      }
      .color {
        p {
          height: 20px;
          width: 20px;
        }
      }
    }
  }
`;
export default Cart;
