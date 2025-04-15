import { Link } from "react-router-dom";
import styled from "styled-components";

const Error = () => {
  return (
    <Wrapper>
      <div id="error-text">
        <img
          src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg"
          alt="404"
        />
        <span className="">404 PAGE</span>
        <p className="p-a text-center">
          . The page you were looking for could not be found
        </p>

        <button className="back mb-5">
          <Link to="/">... Back to Home page</Link>
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: linear-gradient(-45deg, var(--clr-p-5), var(--clr-p-2));

  width: 100%;
  min-height: 100vh;
  line-height: 1.5em;

  #error-text {
    font-size: 40px;
    @media (max-width: 768px) {
      font-size: 20px;
    }
    @media (max-width: 450px) {
      font-size: 16px;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: "Shabnam", Tahoma, sans-serif;
    color: var(--clr-p-2);
    direction: rtl;
  }
  #error-text img {
    margin: 85px auto 20px;
    height: 342px;
    object-fit: contain;
  }
  #error-text span {
    position: relative;
    font-size: 3.3em;
    font-weight: 900;
    margin-bottom: 50px;
  }
  #error-text p.p-a {
    font-size: 19px;
    margin: 30px 0 15px 0;
  }
  #error-text p.p-b {
    font-size: 15px;
  }
  .back {
    background: #fff;
    color: var(--clr-p-3);
    font-size: 30px;
    @media (max-width: 768px) {
      font-size: 1rem;
    }
    text-decoration: none;
    margin: 2em auto 0;
    padding: 0.7em 2em;
    border-radius: 500px;
    box-shadow: 0 20px 70px 4px rgba(0, 0, 0, 0.1),
      inset 7px 33px 0 0px var(--clr-s-5);
    font-weight: 900;
    transition: all 300ms ease;
  }
  #error-text .back:hover {
    -webkit-transform: translateY(-13px);
    transform: translateY(-13px);
    box-shadow: 0 35px 90px 4px rgba(0, 0, 0, 0.3), inset 0px 0 0 3px #000;
  }

  @font-face {
    font-family: Shabnam;
    src: url("https://cdn.rawgit.com/ahmedhosna95/upload/ba6564f8/fonts/Shabnam/Shabnam-Bold.eot");
    src: url("https://cdn.rawgit.com/ahmedhosna95/upload/ba6564f8/fonts/Shabnam/Shabnam-Bold.eot?#iefix")
        format("embedded-opentype"),
      url("https://cdn.rawgit.com/ahmedhosna95/upload/ba6564f8/fonts/Shabnam/Shabnam-Bold.woff")
        format("woff"),
      url("https://cdn.rawgit.com/ahmedhosna95/upload/ba6564f8/fonts/Shabnam/Shabnam-Bold.woff2")
        format("woff2"),
      url("https://cdn.rawgit.com/ahmedhosna95/upload/ba6564f8/fonts/Shabnam/Shabnam-Bold.ttf")
        format("truetype");
    font-weight: bold;
  }
  @font-face {
    font-family: Shabnam;
    src: url("https://cdn.rawgit.com/ahmedhosna95/upload/ba6564f8/fonts/Shabnam/Shabnam.eot");
    src: url("https://cdn.rawgit.com/ahmedhosna95/upload/ba6564f8/fonts/Shabnam/Shabnam.eot?#iefix")
        format("embedded-opentype"),
      url("https://cdn.rawgit.com/ahmedhosna95/upload/ba6564f8/fonts/Shabnam/Shabnam.woff")
        format("woff"),
      url("https://cdn.rawgit.com/ahmedhosna95/upload/ba6564f8/fonts/Shabnam/Shabnam.woff2")
        format("woff2"),
      url("https://cdn.rawgit.com/ahmedhosna95/upload/ba6564f8/fonts/Shabnam/Shabnam.ttf")
        format("truetype");
    font-weight: normal;
  }
`;
export default Error;
