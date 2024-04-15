import React, { useEffect, useState } from "react";

const MainPage = () => {
  const [headingText, setHeadingText] = useState("Welcome to the Voting App!");

  useEffect(() => {
    const words = headingText.split(" ");
    let currentWordIndex = 0;

    const interval = setInterval(() => {
      currentWordIndex++;
      if (currentWordIndex <= words.length) {
        setHeadingText(words.slice(0, currentWordIndex).join(" "));
      } else {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h1>{headingText}</h1>
        <p>Here's how it works:</p>
        <div className="description">
          <p>
            1. Create a Poll: Start by creating a new poll with multiple
            options.
          </p>
          <p>
            2. Share the Link: Share the unique link to your poll with your
            audience.
          </p>
          <p>
            3. Vote: Participants can vote for their preferred option on the
            poll page.
          </p>
          <p>4. View Results: See real-time results as votes come in.</p>
        </div>
      </header>
    </div>
  );
};

export default MainPage;
