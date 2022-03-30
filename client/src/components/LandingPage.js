import React from "react";
import { Link } from "react-router-dom";
import { titulo, botonHome, conteiner } from "./LandingPage.module.css";

function LandingPage() {
  const handleClick = (e) => alert("Redirigiendote a la HomePage!😊");
  return (
    <div className={conteiner}>
      <h1 className={titulo}>BIENVENIDOS</h1>
      <Link to="/home">
        <button className={botonHome} onClick={handleClick}>
          HOME
        </button>
      </Link>
    </div>
  );
}

export default LandingPage;
