import { Link } from "react-router-dom";
import styled from "styled-components";
import image from "../assets/login-form1.avif";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/Config";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useUserContext } from "../context/UserContext";

const Login = () => {
  const { createUser, current_user, userLogged, googleSignUp } =
    useUserContext();
  const name = useRef(null);
  const password = useRef(null);

  const loginUser = async (e) => {
    e.preventDefault();
    const email = name.current?.value;
    const passwd = password.current?.value;

    if (!email || !passwd) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        passwd
      );
      console.log(userCredential);
      const user = userCredential.user;
      const displayName = user.displayName || email; // Use email if displayName is null
      const uid = user.uid;

      console.log("User Credential:", userCredential);
      console.log("Current User:", current_user);

      createUser(displayName, uid);
      toast.success("Login successful");
    } catch (error) {
      toast.error(error.code.slice(5));
    }
  };

  return (
    <Wrapper className="py-5">
      <div className="signup-form section-center p-2">
        <img src={image} alt="Login Form" />
        <div className="form">
          <h2 className="text-dark">
            Welcome to AIR STORE,
            <br />
            Sign In to continue
          </h2>

          <p className="my-4 text-secondary">
            Don&apos;have an account?
            <Link
              to="/register"
              className="text-dark text-decoration-underline fw-semibold"
            >
              Create One!
            </Link>{" "}
            &nbsp; It Takes Less than a minute.
          </p>
          <form onSubmit={loginUser}>
            <div>
              <label>Email</label>
              <input
                ref={name}
                className="form-control mt-2"
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="my-4">
              <label>Password</label>
              <input
                ref={password}
                className="form-control mt-2"
                type="password"
                placeholder="Password"
                required
              />
            </div>

            {userLogged ? (
              <>
                <button
                  type="button"
                  className="text-capitalize btn btn-solid btn-100 mb-3"
                >
                  Signed in as{" "}
                  <span className="fw-semibold text-lowercase">
                    {current_user?.name || "Guest"}
                  </span>
                </button>
                <p className="mt-3 text-decoration-underline fw-semibold">
                  <Link to="/myaccount">Logout?</Link>
                </p>
              </>
            ) : (
              <>
                <p className="text-center my-4 text-decoration-underline">
                  Forget Password?
                </p>
                <button className="btn btn-solid btn-100" type="submit">
                  Sign In
                </button>
                <button
                  onClick={googleSignUp}
                  type="button"
                  className="btn my-4 btn-100"
                >
                  Sign In with Google
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  background-color: var(--clr-p-9);

  .signup-form {
    max-width: 900px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    background-color: var(--clr-p-11);
    gap: 2rem;
    align-items: center;
  }
  @media only screen and (max-width: 768px) {
    .signup-form {
      grid-template-columns: unset;
    }
  }
  @media only screen and (min-width: 1400px) {
    .signup-form {
      max-width: 1200px;
    }
  }
`;

export default Login;
