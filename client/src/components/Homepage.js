import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterGamesByCreation,
  filterGamesByGenre,
  getAllVideogames,
  getVideogamesByName,
  orderByName,
} from "../action";
import Card from "./Card";
import Pages from "./Pages";
import { Link } from "react-router-dom";

function Homepage() {
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const [gamesXpage] = useState(15);
  const [sort, setSort] = useState("");
  const indexOfLastGame = page * gamesXpage;
  const indexOfFirstGame = indexOfLastGame - gamesXpage;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllVideogames());
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const videogames = useSelector((state) => state.videogames);
  const currentGames = videogames.slice(indexOfFirstGame, indexOfLastGame);

  const handleClick = (e) => {
    e.preventDefault();
    console.log(videogames);
    return dispatch(getAllVideogames());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) return dispatch(getVideogamesByName(input));
  };

  const handlePages = (num) => setPage(num);

  const handleFilterGenre = (e) => dispatch(filterGamesByGenre(e.target.value));
  const handleFilterCreation = (e) =>
    dispatch(filterGamesByCreation(e.target.value));

  const handleSort = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setPage(1);
    setSort(e.target.value);
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
        <select onChange={handleSort}>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <select onChange={handleFilterGenre}>
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
          <option value="Massively Multiplayer">Massively Multyplayer</option>
          <option value="Sports">Sports</option>
          <option value="Fighting">Fighting</option>
          <option value="Family">Family</option>
          <option value="Board Games">Board Games</option>
          <option value="Educational">Educational</option>
          <option value="Card">Card</option>
        </select>
        <select onChange={handleFilterCreation}>
          <option value="All">Todos</option>
          <option value="Api">Existente</option>
          <option value="Db">Creado</option>
        </select>
      </div>
      <Pages
        videogames={videogames.length}
        gamesXpage={gamesXpage}
        handlePage={handlePages}
      />
      {currentGames &&
        currentGames.map((game) => {
          return (
            <div>
              <Link to={`/home/${game.id}`}>
                <Card
                  key={game.id}
                  name={game.name}
                  img={game.img}
                  genres={game.genres || game.Genres}
                />
              </Link>
            </div>
          );
        })}
    </>
  );
}

export default Homepage;
