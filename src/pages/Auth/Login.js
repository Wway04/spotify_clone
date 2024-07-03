import { useEffect, useRef, useState } from "react";
import "./Auth.scss";
import { Divider } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CLIENT_ID = "bcb629904e374fdfb0f99db29dd3e8a3";
const REDIRECT_URI = "http://localhost:3000/login";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";

function Login() {
  // Get user id spotify account
  const getUserId = async (token) => {
    await axios
      .get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        localStorage.setItem("user_id", response.data.id);
      })
      .catch(function (error) {
        if (error.response) {
          console.log("Server responded with status code:", error.response.status);
          console.log("Response data:", error.response.data);
        } else if (error.request) {
          console.log("No response received:", error.request);
        } else {
          console.log("Error creating request:", error.message);
        }
      });
  };
  // Get token spotify account information from server and retrieve user information from server using token information
  useEffect(() => {
    async function getTokenAndIdUser() {
      const hash = window.location.hash;
      let token = window.localStorage.getItem("token");
      if (!token && hash) {
        token = hash
          .substring(1)
          .split("&")
          .find((elem) => elem.startsWith("access_token"))
          .split("=")[1];
        window.location.hash = "";
        localStorage.setItem("token", token);
        if (!localStorage.getItem("user_id")) {
          await getUserId(token);
        }
        navigate("/");
      }
    }
    getTokenAndIdUser();
  }, []);

  const navigate = useNavigate();

  // inputs form
  const emailInput = useRef();
  const passwordInput = useRef();

  // information login form
  const [email, setEmail] = useState();
  const [emailErrorMessage, setEmailErrorMessage] = useState();
  const [password, setPassword] = useState();
  const [passwordErrorMessage, setPasswordErrorMessage] = useState();

  const [isError, setIsError] = useState(false);

  // handle onchange event for email and password errors
  const handleEmail = (e) => {
    setIsError(false);
    setEmailErrorMessage("");
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setIsError(false);
    setPasswordErrorMessage("");
    setPassword(e.target.value);
  };

  const handleValidate = (type) => {
    const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
    if (type === "email") {
      if (!email) {
        setEmailErrorMessage("Please enter your email.");
        return false;
      }
      setEmailErrorMessage("");
      return true;
    } else if (type === "password") {
      if (!password) {
        setPasswordErrorMessage("Please enter your password.");
        return false;
      }
      setPasswordErrorMessage("");
      return true;
    }
    if (!(password === "123123123")) return false;
    if (!emailRegex.test(email)) return false;
    return true;
  };

  const handleSubmit = (e) => {
    if (!handleValidate("email") && !handleValidate("password")) {
      e.preventDefault();
      setIsError(true);
      emailInput.current.focus();
      return;
    }

    if (!handleValidate("email")) {
      e.preventDefault();
      setIsError(true);
      emailInput.current.focus();
      return;
    }
    if (!handleValidate("password")) {
      e.preventDefault();
      setIsError(true);
      passwordInput.current.focus();
      return;
    }
    if (!handleValidate) {
      e.preventDefault();
      setIsError(true);
      return;
    }
  };

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [token, setToken] = useState("");

  return (
    <div className="login">
      <>
        <header className="login-header">
          <Link to="/">
            <img src={require("../../assets/image/spotify_logo.jpg")} alt="" width="117px" height="36px" />
          </Link>
        </header>
        <main className="login-main">
          <div className="login-inner">
            <div className="login-title">
              <h1>Log in to Spotify</h1>
            </div>
            {isError && (
              <div
                className="w-100 d-flex align-items-center justify-content-center errror-banner"
                style={{ backgroundColor: "#e91529" }}
              >
                <div className="errror-banner-inner">
                  <i className="fa-solid fa-circle-exclamation" style={{ color: "#ffffff" }}></i>
                  <span>Incorrect username or password.</span>
                </div>
              </div>
            )}
            <div className="login-links">
              <a href="#" className="login-link-btn">
                <button>
                  <img
                    src="https://cdn.pixabay.com/photo/2021/05/24/09/15/google-logo-6278331_1280.png"
                    alt=""
                    width="16px"
                  />
                  Continue with Google
                </button>
              </a>
              <a href="#" className="login-link-btn">
                <button>
                  <img
                    src="https://cdn.pixabay.com/photo/2021/05/24/09/15/google-logo-6278331_1280.png"
                    alt=""
                    width="16px"
                  />
                  Continue with Facebook
                </button>
              </a>
              <a href="#" className="login-link-btn">
                <button>
                  <img
                    src="https://cdn.pixabay.com/photo/2021/05/24/09/15/google-logo-6278331_1280.png"
                    alt=""
                    width="16px"
                  />
                  Continue with Apple
                </button>
              </a>
              <a href="#" className="login-link-btn">
                <button>Continue with Google</button>
              </a>
            </div>
            <div className="w-75 login-divider" style={{ height: "28px" }}>
              <Divider style={{ backgroundColor: "#292929", margin: "14px 0" }} />
            </div>
            <form className="login-form">
              <div className={`login-form-group ${emailErrorMessage ? "error" : ""}`}>
                <label htmlFor="email">
                  Email or username
                  <span
                    role="button"
                    onClick={() => {
                      setIsError(false);
                      setEmailErrorMessage("");
                      setPasswordErrorMessage("");
                      setEmail("wway04@gmail.com");
                    }}
                  >
                    (wway04@gmail.com)
                  </span>
                </label>
                <input
                  ref={emailInput}
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter email..."
                  value={email}
                  onChange={handleEmail}
                  onBlur={() => handleValidate("email")}
                />
                {emailErrorMessage && (
                  <p id="error-message" style={{ fontSize: "14px", fontWeight: 400 }}>
                    <i className="fa-solid fa-triangle-exclamation" style={{ color: "#f90101" }}></i>
                    {emailErrorMessage}
                  </p>
                )}
              </div>
              <div className={`login-form-group ${passwordErrorMessage ? "error" : ""}`}>
                <label htmlFor="password">
                  Password
                  <span
                    role="button"
                    onClick={() => {
                      setIsError(false);
                      setEmailErrorMessage("");
                      setPasswordErrorMessage("");
                      setPassword("123123123");
                    }}
                  >
                    (123123123)
                  </span>
                </label>
                <div className="password-input">
                  <input
                    autoComplete="on"
                    ref={passwordInput}
                    type={`${isShowPassword ? "text" : "password"}`}
                    id="password"
                    name="password"
                    placeholder="Enter password..."
                    value={password}
                    onChange={handlePassword}
                    onBlur={() => handleValidate("password")}
                  />
                  <div
                    role="button"
                    className="showpass-icon"
                    onClick={() => {
                      setIsShowPassword(!isShowPassword);
                    }}
                  >
                    {isShowPassword ? (
                      <i className="fa-solid fa-eye" style={{ color: "#ffffff" }}></i>
                    ) : (
                      <i className="fa-regular fa-eye-slash" style={{ color: "#ffffff" }}></i>
                    )}
                  </div>
                </div>
                {passwordErrorMessage && (
                  <p id="error-message" style={{ fontSize: "14px", fontWeight: 400 }}>
                    <i className="fa-solid fa-triangle-exclamation" style={{ color: "#f90101" }}></i>{" "}
                    {passwordErrorMessage}
                  </p>
                )}
              </div>
              <button onClick={handleSubmit}>
                <a
                  href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=playlist-modify-private`}
                >
                  Login to Spotify
                </a>
              </button>
              <div className="text-center mt-4 hover-link forgot-password ">
                <a href="#">Forgot your password?</a>
              </div>
            </form>
            <div className="w-75 login-divider" style={{ height: "28px" }}>
              <Divider style={{ backgroundColor: "#292929", margin: "14px 0" }} />
            </div>
            <div className="navigation-register hover-link">
              <p>
                <span>Don't have an account?</span>
                <Link to="/register">Sign up for Spotify</Link>
              </p>
            </div>
          </div>
        </main>
        <footer className="login-footer">
          <span>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</span>
        </footer>
      </>
    </div>
  );
}

export default Login;
