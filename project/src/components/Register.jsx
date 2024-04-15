import React, { useState } from "react";
import userData from "./userData";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(userData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    console.log(formData);
    // const updatedUserInfo = [...userInfo, formData];
    // alert("registered successfully");
    // saveUserInfo(updatedUserInfo);
    let responseData;
    await fetch("http://localhost:3000/register-users", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));
    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      // alert("Registered successfully");
      message.success("Registered Successfully");
      navigate("/candidates");
    } else {
      message.error("existing user found");
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
          value={formData.username}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          className="form-control"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="password">Email</label>

        <input
          className="form-control"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="phone_number">Phone Number</label>

        <input
          className="form-control"
          type="number"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleInputChange}
        />
        <br />

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleRegister}
        >
          Register
        </button>
        <Link
          to="/login"
          className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
        >
          Already a user login here
        </Link>
      </form>
    </div>
  );
};

export default Register;
