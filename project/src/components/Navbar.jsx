import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { MdHowToVote } from "react-icons/md";

const Navbar = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  console.log(isAdmin);
  const checkIfAdmin = async () => {
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

        setIsAdmin(true);

        navigate("/admin");
      } else {
        message.error("You are not allowed");
        setIsAdmin(false);
        navigate("/candidates");
      }
    }
  };

  useEffect(() => {
    checkIfAdmin();
  }, []);
  return (
    <div className="nav">
      <div className="logo">
        Voting App <MdHowToVote />
      </div>
      <div className="login-logout">
        {localStorage.getItem("auth-token") ? (
          <button
            className="logout"
            onClick={() => {
              localStorage.removeItem("auth-token");
              navigate("/");
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="login">Login/SignUp</button>
          </Link>
        )}
        {/* {localStorage.getItem("auth-token") ? (
          <></>
        ) : (
          <Link to="/register" className="register">
            Register
          </Link>
        )} */}
      </div>
    </div>
  );
};

export default Navbar;
