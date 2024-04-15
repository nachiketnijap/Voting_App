import React from "react";
import { useState } from "react";
import { message } from "antd";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    console.log(userData);

    let responseData;
    await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);

      message.success("Login successfully");
      if (localStorage.getItem("auth-token")) {
        let responseData;
        await fetch(`http://localhost:3000/isAdmin`, {
          method: "POST",
          headers: {
            Accept: "application/form-data",
            "auth-token": `${localStorage.getItem("auth-token")}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => (responseData = data))
          .catch((error) => {
            console.error("Error:", error);
          });
        if (responseData.success) {
          message.success("Welcome");

          navigate("/admin");
        } else {
          navigate("/candidates");
        }
      }
    } else {
      // alert(responseData.errors);
      message.error("invalid user");
    }
  };
  return (
    <div className="container">
      <form className="width-form">
        <label htmlFor="username">Username</label>
        <input
          className="form-control"
          type="text"
          name="username"
          placeholder="Username"
          value={userData.username}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          className="form-control"
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleInputChange}
        />
        <br />
        <button type="button" className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
        <Link
          to="/register"
          className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
        >
          Not a user Register here
        </Link>
      </form>
    </div>
  );
};

export default Login;
