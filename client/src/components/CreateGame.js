import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createVideogame, getAllGenres } from "../action";

function CreateGame() {
  const [input, setInput] = useState({
    name: "",
    description: "",
    launchDate: "",
    rating: 0,
    genres: [],
    platforms: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGenres());
  }, []);

  const genres = useSelector((state) => state.genres);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  //Se puede usar el useHistory() y history.push("/home") para redirigir al usuario al home.
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Formulario Enviado Exitosamente");
    console.log(input);
    dispatch(createVideogame(input));
    setInput({
      name: "",
      description: "",
      launchDate: "",
      rating: 0,
      genres: [],
      platforms: "",
    });
  };

  const handleChecked = (e) => {
    setInput({
      ...input,
      platforms: input.platforms + " " + e.target.value,
    });
  };

  const handleGenres = (e) => {
    setInput({
      ...input,
      genres: [...input.genres, e.target.value],
    });
  };
  return (
    <>
      <Link to="/home">Volver a Home</Link>
      <h1>Formulacion de Creacion</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Descripcion</label>
          <input
            type="text"
            name="description"
            value={input.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="launchDate">Fecha de Lanzamiento</label>
          <input
            type="date"
            name="launchDate"
            value={input.launchDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            name="rating"
            value={input.rating}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Plataformas: </label>
          <label htmlFor="Xbox Series">
            <input
              type="checkbox"
              value="Xbox Series"
              name="Xbox Series"
              onChange={handleChecked}
            />
            Xbox Series
          </label>
          <label htmlFor="Playstation 4">
            <input
              type="checkbox"
              value="Playstation 4"
              name="Playstation 4"
              onChange={handleChecked}
            />
            Playstation 4
          </label>
          <label htmlFor="PC">
            <input
              type="checkbox"
              value="PC"
              name="PC"
              onChange={handleChecked}
            />
            PC
          </label>
          <label htmlFor="Android">
            <input
              type="checkbox"
              value="Android"
              name="Android"
              onChange={handleChecked}
            />
            Android
          </label>
          <label htmlFor="Nintento Switch">
            <input
              type="checkbox"
              value="Nintento Switch"
              name="Nintento Switch"
            />
            Nintento Switch
          </label>
          <label htmlFor="IOS">
            <input
              type="checkbox"
              value="IOS"
              name="IOS"
              onChange={handleChecked}
            />
            IOS
          </label>
          <label htmlFor="Playstation 5">
            <input
              type="checkbox"
              value="Playstation 5"
              name="Playstation 5"
              onChange={handleChecked}
            />
            Playstation 5
          </label>
          <label htmlFor="Xbox One">
            <input
              type="checkbox"
              value="Xbox One"
              name="Xbox One"
              onChange={handleChecked}
            />
            Xbox One
          </label>
          <label htmlFor="Linux">
            <input
              type="checkbox"
              value="Linux"
              name="Linux"
              onChange={handleChecked}
            />
            Linux
          </label>
          <label htmlFor="macOS">
            <input
              type="checkbox"
              value="macOS"
              name="macOS"
              onChange={handleChecked}
            />
            macOS
          </label>
          <label htmlFor="Playstation 3">
            <input
              type="checkbox"
              value="Playstation 3"
              name="Playstation 3"
              onChange={handleChecked}
            />
            Playstation 3
          </label>
          <label htmlFor="Xbox 360">
            <input
              type="checkbox"
              value="Xbox 360"
              name="Xbox 360"
              onChange={handleChecked}
            />
            Xbox 360
          </label>
        </div>
        <select name="Generos" onChange={handleGenres}>
          {genres &&
            genres.map((genre) => {
              return (
                <option value={genre.name} key={genre.id}>
                  {genre.name}
                </option>
              );
            })}
        </select>
        {input.genres.length ? (
          <p>Generos seleccionados: {input.genres.join(" ")}</p>
        ) : null}
        <br />
        <input type="submit" />
      </form>
    </>
  );
}

export default CreateGame;
