import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  const handleClick = (e) => alert("Redirigiendote a la HomePage!😊");
  return (
    <div>
      <h1>WELCOME</h1>
      <Link to="/home">
        <button onClick={handleClick}>HOME</button>
      </Link>
    </div>
  );
}

export default LandingPage;
