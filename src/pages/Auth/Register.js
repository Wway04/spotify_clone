import { useState } from "react";
import "./Auth.scss";
import { Divider } from "antd";
import { Link } from "react-router-dom";
function Register() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  return (
    <div className="register">
      <header className="register-header">
        <Link to="/">
          <img src={require("../../assets/image/spotify_logo.jpg")} alt="" width="117px" height="36px" />
        </Link>
      </header>
      <main className="register-main">
        <div className="register-inner">
          <div className="register-title" style={{ width: "348px" }}>
            <h1>Sign up to start listening</h1>
          </div>

          <div className="register-form">
            <div className="register-form-group">
              <label htmlFor="email">Email or username(wway04)</label>
              <input type="text" id="email" name="email" placeholder="Enter email..." />
            </div>
            <div className="use-phone-number">
              <a href="#">Use phone number instead</a>
            </div>
            <button>Next</button>
          </div>
          <div style={{ width: "324px" }}>
            <Divider style={{ "border-block-start-color": "#727272", color: "white" }}>Or</Divider>
          </div>

          <div className="register-links">
            <a href="#" className="register-link-btn">
              <button>
                <img
                  src="https://cdn.pixabay.com/photo/2021/05/24/09/15/google-logo-6278331_1280.png"
                  alt=""
                  width="16px"
                />
                Continue with Facebook
              </button>
            </a>
            <a href="#" className="register-link-btn">
              <button>
                <img
                  src="https://cdn.pixabay.com/photo/2021/05/24/09/15/google-logo-6278331_1280.png"
                  alt=""
                  width="16px"
                />
                Continue with Apple
              </button>
            </a>
            <a href="#" className="register-link-btn">
              <button>Continue with Google</button>
            </a>
          </div>

          <div style={{ width: "324px" }}>
            <Divider style={{ "border-block-start-color": "#727272", color: "white" }} />
          </div>
          <div className="navigation-register hover-link">
            <p>
              <span>Already have an account?</span>
              <Link to="/login">Log in here.</Link>
            </p>
          </div>
        </div>
      </main>
      <footer className="d-flex justify-content-center align-items-center register-footer">
        <div className="text-center">
          <span>
            This site is protected by reCAPTCHA and the Google
            <br />
            <a href="#" className="text-decoration-underline">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="#" className="text-decoration-underline">
              Terms of Service
            </a>{" "}
            apply.
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Register;
