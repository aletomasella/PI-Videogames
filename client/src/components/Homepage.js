import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  filterGamesByCreation,
  filterGamesByGenre,
  getAllVideogames,
  getVideogamesByName,
  orderByName,
  orderByRating,
} from '../action';
import Card from './Card';
import Game from './Game';
import Pages from './Pages';
import { Link } from 'react-router-dom';
import {
  botones,
  conteiner,
  games,
  searchInput,
  selectMenus,
  titulo,
  linkForm,
  conteinerButtons,
} from './Homepage.module.css';

function Homepage() {
  const [input, setInput] = useState('');
  const [page, setPage] = useState(1);
  const [gamesXpage] = useState(15);
  const [sort, setSort] = useState('');
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

  const handleSortByName = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setPage(1);
    setSort(`Ordenando por Nombre en Sentido ${e.target.value}`);
  };

  const handleSortByRating = (e) => {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setPage(1);
    setSort(`Ordenando por Rating en Sentido ${e.target.value}`);
  };

  return (
    <div className={conteiner}>
      <div className={conteinerButtons}>
        <h2 className={titulo}>HOMEPAGE</h2>
        <div>
          <Link to='/home/form' className={linkForm}>
            Formulario De Creacion
          </Link>
        </div>
        <button className={botones} onClick={handleClick}>
          Volver a cargar los videojuegos
        </button>
        <br />
        <input
          type='text'
          placeholder='Search'
          value={input}
          onChange={handleChange}
          name='search'
          className={searchInput}
        />
        <input
          type='submit'
          onClick={handleSubmit}
          value='Search'
          className={botones}
        />
        <div>
          <select onChange={handleSortByName} className={selectMenus}>
            <option value='asc'>Orden Ascendente Por Nombre</option>
            <option value='desc'>Orden Descendente Por Nombre</option>
          </select>
          <select onChange={handleSortByRating} className={selectMenus}>
            <option value='asc'>Orden Ascendente Por Rating</option>
            <option value='desc'>Orden Descendente Por Rating</option>
          </select>
          <select onChange={handleFilterGenre} className={selectMenus}>
            <option value='All'>Todos</option>
            <option value='Action'>Action</option>
            <option value='Indie'>Indie</option>
            <option value='Adventure'>Adventure</option>
            <option value='RPG'>RPG</option>
            <option value='Strategy'>Strategy</option>
            <option value='Shooter'>Shooter</option>
            <option value='Platformer'>Platformer</option>
            <option value='Casual'>Casual</option>
            <option value='Simulation'>Simulation</option>
            <option value='Puzzle'>Puzzle</option>
            <option value='Arcade'>Arcade</option>
            <option value='Racing'>Racing</option>
            <option value='Massively Multiplayer'>Massively Multyplayer</option>
            <option value='Sports'>Sports</option>
            <option value='Fighting'>Fighting</option>
            <option value='Family'>Family</option>
            <option value='Board Games'>Board Games</option>
            <option value='Educational'>Educational</option>
            <option value='Card'>Card</option>
          </select>
          <select onChange={handleFilterCreation} className={selectMenus}>
            <option value='All'>Todos</option>
            <option value='Api'>Existente</option>
            <option value='Db'>Creado</option>
          </select>
        </div>
        <Pages
          videogames={videogames.length}
          gamesXpage={gamesXpage}
          handlePage={handlePages}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {currentGames &&
          currentGames.map((game) => (
            <Game values={{ name: game.name, background_image: game.img }} />
          ))}
      </div>
    </div>
  );
}

export default Homepage;
