import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
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

  useEffect(()=>{
    if(localStorage.getItem("chat-app-user")){
      navigate("/");
    }
  },[]);

  const handleValidation = () => {
    const { username, password } = values;
    if (username === "" && password==="") {
      toast.error("Enter username and password to login", toastOption);
      return false;
    }else if (username === "") {
      toast.error("Enter username to login", toastOption);
      return false;
    } else if (password === "") {
      toast.error("Enter password to login", toastOption);
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
        <div className="row justify-content-md-center mt-4">
          <div className="col-4 text-center mt-5 login-box border-1 py-5 px-5">
            <h3>LOGIN</h3>
            <div className="input-group mb-3 mt-4">
              <input
                type="text"
                placeholder="Username"
                onChange={handleChange}
                name="username"
                min="3"
              />
            </div>
            <div className="input-group mb-3 mt-4">
              <input
                type="text"
                placeholder="password"
                onChange={handleChange}
                name="password"
              />
            </div>
            <button className="login-btn mt-4" onClick={handleSubmit}>Log In</button>
          </div>
        </div>
        <div className="row justify-content-md-center">
          <div className="col-4 text-center mt-5 login-box border-1 px-5">
            <div className="sign-up-link text-center py-3">
              <p className="mb-0">Don't have an account?</p>
              <span>
                <Link className="link" to="/Signup"> Sign up</Link>
              </span>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}

export default Login;
