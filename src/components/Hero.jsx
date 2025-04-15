import { Link } from "react-router-dom";
import styled from "styled-components";

const Hero = ({ page, extra }) => {
  return (
    <Wrapper className="d-flex justify-content-center align-items-center">
      <Link to="/">Home / </Link>
      {extra && <Link to="/products">&nbsp; Products / </Link>}
      &nbsp;{page}
    </Wrapper>
  );
};

const Wrapper = styled.span`
  background-color: var(--clr-p-9);
  text-align: center;
  height: 7rem;
  margin: 3rem 0;
  color: var(--clr-p-1);
  font-weight: 700;
  font-size: 1.4rem;
  @media only screen and (max-width: 600px) {
    font-size: 1rem;
  }
  text-transform: capitalize;
  a {
    /* transition: var(--transition); */
    text-transform: uppercase;
    color: var(--clr-p-6);
    :hover {
      color: var(--clr-p-3);
    }
  }
`;
export default Hero;
