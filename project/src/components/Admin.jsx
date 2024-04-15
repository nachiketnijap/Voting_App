import React, { useEffect, useState } from "react";
import { GiElephant } from "react-icons/gi";
import { FaBicycle } from "react-icons/fa";
import { FaHelicopter } from "react-icons/fa";
import { GiKite } from "react-icons/gi";
const Admin = () => {
  const [allCandidates, setAllCandidates] = useState([{ voteCount: 0 }]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedTab, setSelectedTab] = useState("admin");
  const sortedCandidates = allCandidates.sort(
    (a, b) => b.voteCount - a.voteCount
  );

  const maxVoteCount = sortedCandidates[0].voteCount;
  const handleSearch = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/getDataOfSingleCandidate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ searchTerm }),
        }
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const fetchInfo = async () => {
    let responseData;
    await fetch("http://localhost:3000/getDataOfCandidates")
      .then((res) => res.json())
      .then((data) => {
        setAllCandidates(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);
  return (
    <div className="container-admin">
      <div className="sidebar">
        <ul>
          <li
            onClick={() => setSelectedTab("admin")}
            className={selectedTab === "admin" ? "active" : ""}
          >
            Admin
          </li>

          <li
            onClick={() => setSelectedTab("about")}
            className={selectedTab === "about" ? "active" : ""}
          >
            Home
          </li>
        </ul>
      </div>
      {selectedTab === "admin" && (
        <div className="margin-admin">
          <div className="margin-fields">
            <div className="candidate-symbol">
              <div className="symbol">
                <div>candidate1</div>
                <div className="symbol-container">
                  <GiElephant />
                </div>
              </div>
              <div className="symbol">
                <div>candidate2</div>

                <div className="symbol-container">
                  <FaBicycle />
                </div>
              </div>
              <div className="symbol">
                <div>candidate3</div>
                <div className="symbol-container">
                  <FaHelicopter />
                </div>
              </div>
              <div className="symbol">
                <div>candidate4</div>
                <div className="symbol-container">
                  <GiKite />
                </div>
              </div>
            </div>
          </div>
          <div className="input-group mb-width-input input-form margin-fields">
            <input
              type="text"
              className="form-control input-field"
              placeholder="Search Total Vote Count Of Particular Candidate"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={handleSearch}
            >
              search
            </button>
          </div>
          <div className="width-input margin-fields">
            <ul className="list-group list">
              {searchResults.map((candidate) => (
                <li key={candidate.id} className="list-group-item list-count">
                  {candidate.name} - {candidate.voteCount} votes
                </li>
              ))}
            </ul>
          </div>
          <div className="margin-fields">
            <div className="leaderboard">
              <h2>Leaderboard</h2>
              <ol>
                {sortedCandidates.map((candidate, index) => (
                  <li key={index}>
                    <div className="vote-name-container">
                      <span className="candidate-name">
                        {" "}
                        {index === 0 && (
                          <span>
                            <div className="symbol-container">
                              <GiElephant />
                            </div>
                          </span>
                        )}
                        {index === 1 && (
                          <span>
                            <div className="symbol-container">
                              <FaBicycle />
                            </div>
                          </span>
                        )}
                        {index === 2 && (
                          <span>
                            <div className="symbol-container">
                              <FaHelicopter />
                            </div>
                          </span>
                        )}
                        {index === 3 && (
                          <span>
                            <div className="symbol-container">
                              <GiKite />
                            </div>
                          </span>
                        )}
                      </span>
                      <div
                        className="vote-bar"
                        style={{
                          width: `${
                            (candidate.voteCount / maxVoteCount) * 100
                          }%`,
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="margin-fields">
            <table className="table table-secondary table-striped width-table">
              <thead>
                <tr>
                  <th scope="col">Candidates</th>
                  <th scope="col">Count</th>
                </tr>
              </thead>
              <tbody>
                <>
                  {allCandidates?.map((item, i) => (
                    <tr key={i}>
                      <td>{item.name}</td>
                      <td>{item.voteCount}</td>
                    </tr>
                  ))}
                </>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedTab === "about" && (
        <div className="margin-admin">
          <div className="about-content">
            <h1>About Us</h1>
            <p>
              Welcome to our website. We are dedicated to... Lorem ipsum, dolor
              sit amet consectetur adipisicing elit. Sed ratione itaque
              obcaecati doloribus at dolores provident, iure, est minima magnam
              sint quos officia praesentium reiciendis non quod ducimus.
              Veritatis minus quia odit, mollitia eum ullam et ea laudantium
              atque reiciendis! Voluptatum iure quae odit excepturi, dolores
              illo magni adipisci accusamus qui voluptatem ipsa, id
              exercitationem sed repellendus quisquam tenetur ipsum cum.
              Molestias tempora ad saepe beatae corporis voluptatem deleniti.
              Ipsam delectus animi ipsa rem excepturi harum, porro numquam
              aperiam voluptas aliquam veniam amet ipsum, commodi nisi impedit
              vel dolorum at alias, fugiat error facilis. Ipsum molestiae nemo
            </p>
            <p>
              Our mission is to Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Recusandae ullam suscipit est saepe quam quasi
              ab fuga veniam. Nisi excepturi exercitationem a, fuga temporibus
              dolore animi placeat ipsam, iusto non itaque, repellendus hic
              commodi harum.
            </p>
            <p>Contact us at: email@example.com</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
