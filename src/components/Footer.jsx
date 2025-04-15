import { Link } from "react-router-dom";
import styled from "styled-components";

const Footer = () => {
  return (
    <Wrapper className="d-grid place-items-center align-content-center">
      <ol>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>Location</li>
        <li>FAQs</li>
        <li>Contact US</li>
      </ol>
      <p>&copy; Flashsale {new Date().getFullYear()} All rights Reserved</p>
    </Wrapper>
  );
};

export default Footer;
const Wrapper = styled.footer`
  color: #fff;
  width: 100%;
  height: 8rem;
  background-color: var(--clr-p-2);
  text-align: center;

  p {
    margin: 0;
  }
  ol {
    display: flex;
    list-style: none;
    padding: 0;
    justify-content: center;
    gap: 1rem;
    li {
      cursor: pointer;
    }
  }
`;
