import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      console.log("in validation", registerRoute);
      const { username, email, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOption);
      }
      if (data.status === true) {
        toast.error(data.msg, toastOption);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const toastOption = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    theme: "colored",
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  const handleValidation = () => {
    const { username, email, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      toast.error("password and confirm password must be same", toastOption);
      return false;
    } else if (password.length < 8) {
      toast.error("password should be 8 or more character long", toastOption);
      return false;
    } else if (username.length < 3) {
      toast.error("username should be 3 or more character long", toastOption);
      return false;
    } else if (email.length === 0) {
      toast.error("email cannot be empty", toastOption);
      return false;
    }
    return true;
  };
  return (
    <div>
      <header>
        <section className="container-fluid">
          <div className="row top justify-content-md-center">
            <div className="col-2 text-center">
              <p className="logo-text my-1">RandomGC</p>
            </div>
          </div>
        </section>
      </header>
      <section className="container">
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-md-center mt-1">
            <div className="col-4 text-center mt-5 login-box border-1 py-4 px-5">
              <h3>SIGN UP</h3>
              <div className="input-group mb-3 mt-4">      
                <input
                  type="text"              
                  placeholder="Username"
                  onChange={handleChange}
                  name="username"
                />
              </div>
              <div className="input-group mb-3 mt-4">          
                <input
                  type="text"
                  placeholder="Email"
                  onChange={handleChange}
                  name="email"
                />
              </div>
              <div className="input-group mb-3 mt-4">          
                <input
                  type="password"    
                  placeholder="Password"
                  onChange={handleChange}
                  name="password"
                />
              </div>
              <div className="input-group mb-3 mt-4">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  name="confirmPassword"
                />
              </div>
              <button className="login-btn mt-4">Sign Up</button>
            </div>
          </div>
        </form>
        <div className="row justify-content-md-center">
          <div className="col-4 text-center mt-3 login-box border-1 px-5">
            <div className="sign-up-link text-center py-3">
              <p className="mb-0">Have an account?</p>
              <span>
                <Link className="link" to="/Login"> Log in</Link>
              </span>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}

export default Signup;
