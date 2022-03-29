import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideogames, getVideogamesByName } from "../action";
import Card from "./Card";
// import { Link } from "react-router-dom";

function Homepage() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllVideogames());
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const videogames = useSelector((state) => state.videogames);

  const handleClick = (e) => {
    e.preventDefault();
    console.log(videogames);
    return dispatch(getAllVideogames());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) return dispatch(getVideogamesByName(input));
  };

  return (
    <>
      <h2>Homepage</h2>
      <button onClick={handleClick}>Volver a cargar los videojuegos</button>
      <br />
      <input
        type="text"
        placeholder="Search for Videogames"
        value={input}
        onChange={handleChange}
        name="search"
      />
      <input type="submit" onClick={handleSubmit} value="Search" />
      <div>
        <select>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <select>
          <option value="All">Todos</option>
          <option value="Action">Action</option>
          <option value="Indie">Indie</option>
          <option value="Adventure">Adventure</option>
          <option value="RPG">RPG</option>
          <option value="Strategy">Strategy</option>
          <option value="Shooter">Shooter</option>
          <option value="Platformer">Platformer</option>
          <option value="Casual">Casual</option>
          <option value="Simulation">Simulation</option>
          <option value="Puzzle">Puzzle</option>
          <option value="Arcade">Arcade</option>
          <option value="Racing">Racing</option>
          <option value="Massively Multyplayer">Massively Multyplayer</option>
          <option value="Sports">Sports</option>
          <option value="Fighting">Fighting</option>
          <option value="Family">Family</option>
          <option value="Board Games">Board Games</option>
          <option value="Educational">Educational</option>
          <option value="Card">Card</option>
        </select>
      </div>
      {videogames &&
        videogames.map((game) => {
          return (
            <Card
              key={game.id}
              name={game.name}
              img={game.img}
              genres={game.genres}
            />
          );
        })}
    </>
  );
}

export default Homepage;
