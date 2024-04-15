import React from "react";
import candidates from "./candidates";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { MdHowToVote } from "react-icons/md";

const VotingPage = () => {
  const navigate = useNavigate();
  const onSubmitHandler = async (item) => {
    if (localStorage.getItem("auth-token")) {
      let responseData;
      await fetch(`http://localhost:3000/addvotes/${item}`, {
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
        message.success("Response added");
      } else {
        message.error("You have already voted");
      }
    }
  };
  return (
    <div className="voter-list">
      <div className="card card-width">
        <ul className="list-group list-group-flush">
          {candidates.map((item, index) => (
            <li className="list-group-item candidate-names" key={index}>
              {item}

              <button
                className="btn btn-primary cast-vote"
                onClick={() => onSubmitHandler(item)}
              >
                <MdHowToVote className="width-vote-icon" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VotingPage;
