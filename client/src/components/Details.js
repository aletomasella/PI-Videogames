import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideogameById } from "../action";

function Details() {
  const id = useParams().id;
  const dispatch = useDispatch();
  const videogame = useSelector((state) => state.videogame);
  useEffect(() => {
    dispatch(getVideogameById(id));
  }, []);
  // const generosUnidos = videogames.genres.join(" ");

  return (
    <>
      <h1>{videogame.name}</h1>
      <h2>Generos : {videogame.genres}</h2>
      <h3>Fecha de lanzamiento : {videogame.launchDate}</h3>
      <h3>Rating : {videogame.rating}</h3>
      <h3>Plataformas en las cuales esta disponible : {videogame.platforms}</h3>
      <p>
        Descripcion <br /> {videogame.description}
      </p>
      <img
        src={
          videogame.img ||
          "https://blogdigital.es/wp-content/uploads/2015/09/imagen-no-encontrada.jpg"
        }
        alt="IMG NOT FOUND"
        width="800px"
        height="500px"
      />
    </>
  );
}

export default Details;
