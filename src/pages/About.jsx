import styled from "styled-components";
import Hero from "../components/Hero";

const About = () => {
  return (
    <Wrapper className="mb-5">
      {/* <Hero page={"About"}></Hero> */}
      <div className="section-center d-grid">
        <img
          src="https://images.unsplash.com/photo-1651375400003-bc9867e7689a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
          alt=""
        />
        <div>
          <h2>Our Story</h2>
          <div className="underline mb-4"></div>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio at
            sunt, atque eligendi est quia, iste fugiat veritatis reprehenderit
            eaque quibusdam esse quam quis omnis! Similique voluptates earum
            porro voluptate exercitationem nobis officiis sint reprehenderit
            incidunt, commodi eos ad dolorem aperiam ipsum debitis eum harum
            atque q
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  /* min-height: 100vh; */
  min-height: calc(100vh - 5rem);
  .section-center {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    img {
      aspect-ratio: 1/1;
    }
    h2 {
      font-size: 2rem;
      font-weight: 700;
    }
    p {
      color: var(--clr-p-6);
      font-weight: 300;
      line-height: 1.7;
    }
    @media screen and (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
`;
export default About;
