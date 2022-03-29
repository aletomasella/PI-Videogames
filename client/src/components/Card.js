import React from "react";

function Card({ img, name, genres }) {
  const WIDTH = "400px";
  const HEIGHT = "250px";
  if (genres && typeof genres[0] === "object") {
    genres = genres.map((genre) => genre.name);
  }
  return (
    <>
      <h3>Nombre : {name}</h3>
      <h4>Generos : {genres && genres.join(" ")}</h4>
      <img src={img} alt="Img not found" width={WIDTH} height={HEIGHT} />
    </>
  );
}

export default Card;
