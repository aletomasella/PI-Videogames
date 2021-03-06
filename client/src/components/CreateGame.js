import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createVideogame, getAllGenres } from "../action";
import {
  conteiner,
  inputs,
  checkboxsConteiner,
  checkmark,
  botonSubmit,
  inputDescription,
  danger,
  selectMenu,
} from "./CreateGame.module.css";

function validate(input) {
  const errors = {};
  if (!input.name) {
    errors.name = "El nombre es obligatorio.";
  } else if (!input.description) {
    errors.description = "La descripcion es obligatoria.";
  } else if (input.rating > 5 || input.rating < 1) {
    errors.rating = "La puntuacion ingresada no es valida";
  } else if (!input.platforms) {
    errors.platforms = "El juego debe pertencer a una plataforma como minimo.";
  } else if (!input.genres.length) {
    errors.genres = "Se requiere al menos un genero.";
  }
  return errors;
}

function CreateGame() {
  const [input, setInput] = useState({
    name: "",
    description: "",
    launchDate: "",
    rating: 0,
    genres: [],
    platforms: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    rating: "",
    platforms: "",
    genres: [],
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
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };
  //Se puede usar el useHistory() y history.push("/home") para redirigir al usuario al home.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      errors.name ||
      errors.description ||
      errors.rating ||
      errors.genres ||
      errors.platforms
    ) {
      alert(
        "El formulario no fue enviado porque los datos ingresados estan incompletos o son erroneos."
      );
      return;
    }
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
    setErrors(
      validate({
        ...input,
        platforms: input.platforms + " " + e.target.value,
      })
    );
  };

  const handleGenres = (e) => {
    setInput({
      ...input,
      genres: [...input.genres, e.target.value],
    });
    setErrors(
      validate({
        ...input,
        genres: [...input.genres, e.target.value],
      })
    );
  };
  return (
    <>
      <div className={conteiner}>
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
              className={inputs}
            />
            {errors.name && <label className={danger}>{errors.name}</label>}
          </div>
          <div>
            <label htmlFor="description">Descripcion</label>
            {/* <input
              type="text"
              name="description"
              value={input.description}
              onChange={handleChange}
              className={inputDescription}
            /> */}
            <textarea
              name="description"
              value={input.description}
              onChange={handleChange}
              className={inputDescription}
            />
            {errors.description && (
              <label className={danger}>{errors.description}</label>
            )}
          </div>
          <div>
            <label htmlFor="launchDate">Fecha de Lanzamiento</label>
            <input
              type="date"
              name="launchDate"
              value={input.launchDate}
              onChange={handleChange}
              className={inputs}
            />
          </div>
          <div>
            <label htmlFor="rating">Rating</label>
            <input
              type="number"
              name="rating"
              value={input.rating}
              onChange={handleChange}
              className={inputs}
            />
            {errors.rating && <label className={danger}>{errors.rating}</label>}
          </div>
          <div>
            <label>Plataformas: </label>
            <label htmlFor="Xbox Series" className={checkboxsConteiner}>
              <input
                type="checkbox"
                value="Xbox Series"
                name="Xbox Series"
                onChange={handleChecked}
                className={checkmark}
              />
              Xbox Series
            </label>
            <label htmlFor="Playstation 4" className={checkboxsConteiner}>
              <input
                type="checkbox"
                value="Playstation 4"
                name="Playstation 4"
                onChange={handleChecked}
                className={checkmark}
              />
              Playstation 4
            </label>
            <label htmlFor="PC" className={checkboxsConteiner}>
              <input
                type="checkbox"
                value="PC"
                name="PC"
                onChange={handleChecked}
                className={checkmark}
              />
              PC
            </label>
            <label htmlFor="Android" className={checkboxsConteiner}>
              <input
                type="checkbox"
                value="Android"
                name="Android"
                onChange={handleChecked}
                className={checkmark}
              />
              Android
            </label>
            <label htmlFor="Nintento Switch" className={checkboxsConteiner}>
              <input
                type="checkbox"
                value="Nintento Switch"
                name="Nintento Switch"
                onChange={handleChecked}
                className={checkmark}
              />
              Nintento Switch
            </label>
            <label htmlFor="IOS" className={checkboxsConteiner}>
              <input
                type="checkbox"
                value="IOS"
                name="IOS"
                onChange={handleChecked}
                className={checkmark}
              />
              IOS
            </label>
            <label htmlFor="Playstation 5" className={checkboxsConteiner}>
              <input
                type="checkbox"
                value="Playstation 5"
                name="Playstation 5"
                onChange={handleChecked}
                className={checkmark}
              />
              Playstation 5
            </label>
            <label htmlFor="Xbox One" className={checkboxsConteiner}>
              <input
                type="checkbox"
                value="Xbox One"
                name="Xbox One"
                onChange={handleChecked}
                className={checkmark}
              />
              Xbox One
            </label>
            <label htmlFor="Linux" className={checkboxsConteiner}>
              <input
                type="checkbox"
                value="Linux"
                name="Linux"
                onChange={handleChecked}
                className={checkmark}
              />
              Linux
            </label>
            <label htmlFor="macOS" className={checkboxsConteiner}>
              <input
                type="checkbox"
                value="macOS"
                name="macOS"
                onChange={handleChecked}
                className={checkmark}
              />
              macOS
            </label>
            <label htmlFor="Playstation 3" className={checkboxsConteiner}>
              <input
                type="checkbox"
                value="Playstation 3"
                name="Playstation 3"
                onChange={handleChecked}
                className={checkmark}
              />
              Playstation 3
            </label>
            <label htmlFor="Xbox 360" className={checkboxsConteiner}>
              <input
                type="checkbox"
                value="Xbox 360"
                name="Xbox 360"
                onChange={handleChecked}
                className={checkmark}
              />
              Xbox 360
            </label>
            <br />
            {errors.platforms && (
              <label className={danger}>{errors.platforms}</label>
            )}
          </div>
          <select name="Generos" onChange={handleGenres} className={selectMenu}>
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
          {errors.genres && <label className={danger}>{errors.genres}</label>}
          <br />
          <input type="submit" className={botonSubmit} />
        </form>
      </div>
    </>
  );
}

export default CreateGame;
